import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sepsisData } from '../data/sepsisData';
import './ProjectDashboard.css';

const shock = sepsisData.filter(d => d.outcome === 1);
const noShock = sepsisData.filter(d => d.outcome === 0);

function KPIRow() {
  const shockPct = ((shock.length / sepsisData.length) * 100).toFixed(0);
  const avgLactateShock = d3.mean(shock, d => d.Lactate).toFixed(1);
  const avgLactateNo = d3.mean(noShock, d => d.Lactate).toFixed(1);
  const avgSOFAShock = d3.mean(shock, d => d.SOFA).toFixed(1);
  return (
    <div className="dash-kpi-row">
      {[
        {val:`${sepsisData.length}`, label:'Total Patients'},
        {val:`${shock.length}`, label:'Septic Shock', sub:'outcome = 1'},
        {val:`${noShock.length}`, label:'Sepsis Only', sub:'outcome = 0'},
        {val:`${shockPct}%`, label:'Shock Rate'},
        {val:avgLactateShock, label:'Avg Lactate (Shock)', sub:'mmol/L'},
        {val:avgSOFAShock, label:'Avg SOFA (Shock)'},
      ].map(k => (
        <div key={k.label} className="dash-kpi">
          <span className="kpi-val" style={k.val.includes('%')?{color:'#e15759'}:{}}>{k.val}</span>
          <span className="kpi-lbl">{k.label}</span>
          {k.sub && <span style={{fontSize:'0.65rem',color:'#aaa'}}>{k.sub}</span>}
        </div>
      ))}
    </div>
  );
}

function VitalScatter({ xKey, yKey, xLabel, yLabel, threshX }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return; el.innerHTML = '';
    const W = el.clientWidth || 420, H = 300;
    const m = {top:20,right:110,bottom:46,left:55};
    const w = W-m.left-m.right, h = H-m.top-m.bottom;
    const svg = d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g = svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const x = d3.scaleLinear().domain(d3.extent(sepsisData,d=>d[xKey])).nice().range([0,w]);
    const y = d3.scaleLinear().domain(d3.extent(sepsisData,d=>d[yKey])).nice().range([h,0]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).ticks(6))
      .selectAll('line,path').attr('stroke','#ddd');
    g.append('g').call(d3.axisLeft(y).ticks(5))
      .selectAll('line,path').attr('stroke','#ddd');
    g.append('g').selectAll('line').data(y.ticks(5)).enter().append('line')
      .attr('x1',0).attr('x2',w).attr('y1',d=>y(d)).attr('y2',d=>y(d))
      .attr('stroke','#f4f4f4').attr('stroke-dasharray','3,3');
    if (threshX) {
      g.append('line').attr('x1',x(threshX)).attr('x2',x(threshX)).attr('y1',0).attr('y2',h)
        .attr('stroke','#e15759').attr('stroke-dasharray','4,3').attr('stroke-width',1.5);
      g.append('text').attr('x',x(threshX)+4).attr('y',10)
        .attr('font-size','10px').attr('fill','#e15759').text('High risk threshold');
    }
    g.selectAll('circle').data(sepsisData).enter().append('circle')
      .attr('cx',d=>x(d[xKey])).attr('cy',d=>y(d[yKey])).attr('r',5)
      .attr('fill',d=>d.outcome===1?'#e15759':'#4e79a7').attr('opacity',0.7)
      .append('title').text(d=>`Patient ${d.id}\n${xLabel}: ${d[xKey]}\n${yLabel}: ${d[yKey]}\n${d.outcome===1?'⚠ SEPTIC SHOCK':'Sepsis only'}`);
    const leg=svg.append('g').attr('transform',`translate(${W-m.right+8},${m.top})`);
    [{c:'#e15759',l:'Septic Shock'},{c:'#4e79a7',l:'Sepsis Only'}].forEach(({c,l},i)=>{
      leg.append('circle').attr('cx',7).attr('cy',i*22).attr('r',5).attr('fill',c);
      leg.append('text').attr('x',18).attr('y',i*22+4).attr('font-size','11px').attr('fill','#444').text(l);
    });
    svg.append('text').attr('x',m.left+w/2).attr('y',H-4)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text(xLabel);
    svg.append('text').attr('transform',`translate(14,${m.top+h/2}) rotate(-90)`)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text(yLabel);
  },[xKey,yKey,threshX]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

function SOFAHistogram() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return; el.innerHTML='';
    const W = el.clientWidth||420, H=280;
    const m={top:20,right:20,bottom:45,left:55};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const x=d3.scaleLinear().domain([0,20]).range([0,w]);
    const shockBins=d3.bin().domain(x.domain()).thresholds(x.ticks(10))(shock.map(d=>d.SOFA));
    const noBins=d3.bin().domain(x.domain()).thresholds(x.ticks(10))(noShock.map(d=>d.SOFA));
    const y=d3.scaleLinear().domain([0,Math.max(d3.max(shockBins,d=>d.length),d3.max(noBins,d=>d.length))+1]).range([h,0]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).ticks(10));
    g.append('g').call(d3.axisLeft(y).ticks(5));
    const bw=shockBins[0]?(x(shockBins[0].x1)-x(shockBins[0].x0)-1):10;
    noBins.forEach(b=>{
      g.append('rect').attr('x',x(b.x0)).attr('width',bw/2).attr('y',y(b.length))
        .attr('height',h-y(b.length)).attr('fill','#4e79a7').attr('opacity',0.7);
    });
    shockBins.forEach(b=>{
      g.append('rect').attr('x',x(b.x0)+bw/2).attr('width',bw/2).attr('y',y(b.length))
        .attr('height',h-y(b.length)).attr('fill','#e15759').attr('opacity',0.7);
    });
    const leg=svg.append('g').attr('transform',`translate(${m.left+w-100},${m.top})`);
    [{c:'#4e79a7',l:'Sepsis Only'},{c:'#e15759',l:'Septic Shock'}].forEach(({c,l},i)=>{
      leg.append('rect').attr('x',0).attr('y',i*18).attr('width',12).attr('height',10).attr('fill',c).attr('opacity',0.8);
      leg.append('text').attr('x',16).attr('y',i*18+9).attr('font-size','11px').attr('fill','#444').text(l);
    });
    svg.append('text').attr('x',m.left+w/2).attr('y',H-5)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('SOFA Score');
    svg.append('text').attr('transform',`translate(14,${m.top+h/2}) rotate(-90)`)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Patient Count');
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

function FeatureBoxPlot() {
  const features=[
    {key:'Lactate',label:'Lactate (mmol/L)',warn:2},
    {key:'SOFA',label:'SOFA Score',warn:6},
    {key:'HR',label:'Heart Rate (bpm)',warn:100},
    {key:'SBP',label:'Systolic BP (mmHg)',warn:90},
  ];
  const ref = useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return; el.innerHTML='';
    const W=el.clientWidth||500, H=280;
    const m={top:20,right:20,bottom:40,left:130};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const y=d3.scaleBand().domain(features.map(f=>f.label)).range([0,h]).padding(0.35);
    g.append('g').call(d3.axisLeft(y));
    features.forEach(f=>{
      const sv=shock.map(d=>d[f.key]).sort(d3.ascending);
      const nv=noShock.map(d=>d[f.key]).sort(d3.ascending);
      const xRange=[Math.min(d3.min(sv),d3.min(nv)),Math.max(d3.max(sv),d3.max(nv))];
      const x=d3.scaleLinear().domain(xRange).nice().range([0,w]);
      if(f===features[0]){
        g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).ticks(5));
      }
      const drawBox=(vals,yOff,col)=>{
        const q1=d3.quantile(vals,.25),med=d3.quantile(vals,.5),q3=d3.quantile(vals,.75);
        const iqr=q3-q1,lo=Math.max(d3.min(vals),q1-1.5*iqr),hi=Math.min(d3.max(vals),q3+1.5*iqr);
        const yc=y(f.label)+yOff, bh=y.bandwidth()*0.45;
        g.append('line').attr('x1',x(lo)).attr('x2',x(hi)).attr('y1',yc).attr('y2',yc)
          .attr('stroke',col).attr('stroke-width',1.5);
        g.append('rect').attr('x',x(q1)).attr('width',x(q3)-x(q1))
          .attr('y',yc-bh/2).attr('height',bh).attr('fill',col).attr('opacity',0.6).attr('stroke',col);
        g.append('line').attr('x1',x(med)).attr('x2',x(med)).attr('y1',yc-bh/2).attr('y2',yc+bh/2)
          .attr('stroke','#fff').attr('stroke-width',2);
      };
      drawBox(nv, y.bandwidth()*0.25, '#4e79a7');
      drawBox(sv, y.bandwidth()*0.72, '#e15759');
    });
    const leg=svg.append('g').attr('transform',`translate(${m.left+w-120},${m.top})`);
    [{c:'#4e79a7',l:'Sepsis Only'},{c:'#e15759',l:'Septic Shock'}].forEach(({c,l},i)=>{
      leg.append('rect').attr('x',0).attr('y',i*18).attr('width',12).attr('height',10).attr('fill',c).attr('opacity',0.8);
      leg.append('text').attr('x',16).attr('y',i*18+9).attr('font-size','11px').attr('fill','#444').text(l);
    });
    svg.append('text').attr('x',m.left+w/2).attr('y',H-4)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Value');
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

export default function SepsisPage() {
  return (
    <div className="dash-page">
      <div className="dash-hero" style={{background:'#3d0c02'}}>
        <div className="container">
          <span className="dash-icon">🏥</span>
          <div>
            <h1>Septic Shock Detection Dashboard</h1>
            <p className="dash-subtitle">Analysing clinical vitals and lab values to understand which patients progress from sepsis to septic shock</p>
          </div>
        </div>
      </div>

      <div className="container dash-body">

        <section className="dash-section">
          <h2>What is Sepsis and Septic Shock?</h2>
          <div className="dash-findings">
            <div className="dash-finding">
              <span className="finding-num" style={{background:'#e67e22'}}>1</span>
              <div><strong>Sepsis</strong><p>A life-threatening condition where the body's immune system overreacts to an infection. It causes widespread inflammation that can damage organs. Signs include fever, fast heart rate, and rapid breathing.</p></div>
            </div>
            <div className="dash-finding">
              <span className="finding-num" style={{background:'#c0392b'}}>2</span>
              <div><strong>Septic Shock</strong><p>A severe form of sepsis where blood pressure drops dangerously low despite fluid treatment. The organs are not getting enough blood flow. It has a mortality rate of 20–40%. Early detection is critical.</p></div>
            </div>
          </div>
          <p style={{marginTop:'1rem'}}>This dashboard uses clinical measurements to understand <strong>what separates patients who develop septic shock</strong> from those who remain at the sepsis stage. The features include heart rate, blood pressure, respiratory rate, temperature, white blood cell count, lactate, and SOFA score.</p>
        </section>

        <section className="dash-section">
          <h2>Patient Summary</h2>
          <KPIRow/>
        </section>

        <section className="dash-section">
          <h2>Key Clinical Features Explained</h2>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead><tr><th>Feature</th><th>What it measures</th><th>Danger threshold</th></tr></thead>
              <tbody>
                {[
                  ['Heart Rate (HR)','Beats per minute — elevated in infection','>100 bpm = tachycardia'],
                  ['Systolic BP (SBP)','Top number in blood pressure reading','<90 mmHg = hypotension'],
                  ['MAP','Mean Arterial Pressure — average pressure in arteries','<65 mmHg = inadequate organ perfusion'],
                  ['Respiratory Rate','Breaths per minute','>20/min = tachypnea'],
                  ['Temperature','Body temperature in °C','>38°C = fever; <36°C = hypothermia'],
                  ['WBC','White blood cells in thousands — immune response marker','>12 or <4 = abnormal'],
                  ['Lactate','Acid produced when cells lack oxygen — key shock marker','>2 mmol/L = concern; >4 = critical'],
                  ['SOFA Score','Sequential Organ Failure Assessment — combines 6 organ systems','>6 = significant organ failure'],
                ].map(([f,w,d])=><tr key={f}><td><strong>{f}</strong></td><td>{w}</td><td style={{color:'#c0392b',fontWeight:600}}>{d}</td></tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dash-section">
          <h2>Lactate vs SOFA Score</h2>
          <p><strong>Lactate</strong> is the single most important marker for septic shock. It rises when cells are not getting enough oxygen — a sign that the circulatory system is failing. <strong>SOFA score</strong> measures how many organs are failing (heart, lungs, kidneys, liver, brain, and clotting system). Together, these two values almost perfectly separate shock from non-shock patients.</p>
          <VitalScatter xKey="Lactate" yKey="SOFA" xLabel="Lactate (mmol/L)" yLabel="SOFA Score" threshX={2} />
          <div className="dash-insight">Red dots (septic shock) cluster in the top-right — high lactate AND high SOFA. Blue dots (sepsis only) cluster in the bottom-left. The threshold of 2 mmol/L lactate is a clinical guideline for escalating to ICU care.</div>
        </section>

        <section className="dash-section">
          <h2>Heart Rate vs Systolic Blood Pressure</h2>
          <p>In septic shock, the heart beats faster (high HR) to compensate for falling blood pressure. Systolic BP drops below 90 mmHg despite this effort. This combination — fast heart, low pressure — is a classic warning sign.</p>
          <VitalScatter xKey="HR" yKey="SBP" xLabel="Heart Rate (bpm)" yLabel="Systolic BP (mmHg)" />
          <div className="dash-insight">Septic shock patients (red) have both higher heart rates AND lower blood pressure — the body is trying to compensate but failing. Many shock patients have a heart rate above 120 bpm and SBP below 85 mmHg.</div>
        </section>

        <section className="dash-section">
          <h2>SOFA Score Distribution by Outcome</h2>
          <p>This histogram shows how many patients fall into each SOFA score bucket. The two groups (sepsis only vs septic shock) barely overlap — SOFA score alone is a powerful predictor.</p>
          <div className="dash-chart-wrap" style={{maxWidth:520}}>
            <SOFAHistogram/>
          </div>
          <div className="dash-insight">Sepsis-only patients (blue) have SOFA scores mostly between 2 and 6. Septic shock patients (red) are concentrated between 8 and 16. A SOFA score above 8 should trigger immediate escalation of care.</div>
        </section>

        <section className="dash-section">
          <h2>Feature Comparison: Shock vs No Shock</h2>
          <p>These box plots show the spread of four key clinical features, side-by-side for the two patient groups. The <strong>top box</strong> in each pair is sepsis-only (blue); the <strong>bottom box</strong> is septic shock (red).</p>
          <div className="dash-chart-wrap" style={{maxWidth:580}}>
            <FeatureBoxPlot/>
          </div>
          <div className="dash-insight">Across every feature — lactate, SOFA, heart rate, blood pressure — the septic shock group is clearly different. The boxes barely overlap, meaning these four features together provide strong early warning signals.</div>
        </section>

        <section className="dash-section">
          <h2>Age Analysis</h2>
          <p>Older patients are significantly more vulnerable to septic shock. The average age among shock patients in this dataset is <strong>{d3.mean(shock,d=>d.age).toFixed(0)} years</strong> compared to <strong>{d3.mean(noShock,d=>d.age).toFixed(0)} years</strong> for sepsis-only patients.</p>
          <VitalScatter xKey="age" yKey="Lactate" xLabel="Patient Age (years)" yLabel="Lactate (mmol/L)" />
          <div className="dash-insight">Among patients over 65, almost all high-lactate cases progress to septic shock. Younger patients are more likely to remain at the sepsis stage even when lactate is elevated.</div>
        </section>

        <section className="dash-section">
          <h2>Clinical Decision Framework</h2>
          <div className="dash-findings">
            {[
              {n:'⚠',title:'Early Warning Signs',body:'HR > 100, RespRate > 20, Temperature > 38°C or < 36°C, WBC > 12. These alone indicate possible sepsis.'},
              {n:'🔴',title:'Escalate Immediately if…',body:'Lactate > 2 mmol/L OR SBP < 90 mmHg despite 30 mL/kg IV fluid bolus. These are the Sepsis-3 criteria for septic shock.'},
              {n:'📊',title:'Track the SOFA Score',body:'A SOFA score ≥ 2 above baseline confirms organ dysfunction. A rising SOFA score (even without other threshold breaches) predicts deterioration.'},
              {n:'⏱',title:'Time is Critical',body:'Each hour of delayed antibiotic treatment in septic shock increases mortality by 7%. Every 6-hour delay in lactate clearance doubles the risk of death. Speed matters more than perfection.'},
            ].map(f=>(
              <div key={f.n} className="dash-finding">
                <span className="finding-num" style={{background:'#c0392b',fontSize:'1.1rem'}}>{f.n}</span>
                <div><strong>{f.title}</strong><p>{f.body}</p></div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
