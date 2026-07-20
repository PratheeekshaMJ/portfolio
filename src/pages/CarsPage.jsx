import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { carsData } from '../data/carsData';
import './ProjectDashboard.css';

const clean = carsData.filter(d => d.mpg && d.horsepower && d.weight && d.displacement && d.acceleration);

const CYL_COLOR = d3.scaleOrdinal()
  .domain([3,4,5,6,8])
  .range(['#59a14f','#4e79a7','#f28e2b','#e15759','#b07aa1']);

function Scatter({ xKey, yKey, xLabel, yLabel, title, desc, colorByCyl }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return; el.innerHTML = '';
    const W = el.clientWidth || 440, H = 320;
    const m = {top:30,right:colorByCyl?110:20,bottom:50,left:55};
    const w = W-m.left-m.right, h = H-m.top-m.bottom;
    const svg = d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g = svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const x = d3.scaleLinear().domain(d3.extent(clean,d=>d[xKey])).nice().range([0,w]);
    const y = d3.scaleLinear().domain(d3.extent(clean,d=>d[yKey])).nice().range([h,0]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).ticks(6))
      .selectAll('line,path').attr('stroke','#ddd');
    g.append('g').call(d3.axisLeft(y).ticks(5))
      .selectAll('line,path').attr('stroke','#ddd');
    g.append('g').selectAll('line').data(y.ticks(5)).enter().append('line')
      .attr('x1',0).attr('x2',w).attr('y1',d=>y(d)).attr('y2',d=>y(d))
      .attr('stroke','#f4f4f4').attr('stroke-dasharray','3,3');

    // regression line
    const xm = d3.mean(clean,d=>d[xKey]), ym = d3.mean(clean,d=>d[yKey]);
    const num = d3.sum(clean,d=>(d[xKey]-xm)*(d[yKey]-ym));
    const den = d3.sum(clean,d=>(d[xKey]-xm)**2);
    const slope = num/den, intercept = ym - slope*xm;
    const [x0,x1] = d3.extent(clean,d=>d[xKey]);
    g.append('line').attr('x1',x(x0)).attr('x2',x(x1))
      .attr('y1',y(slope*x0+intercept)).attr('y2',y(slope*x1+intercept))
      .attr('stroke','#c9a84c').attr('stroke-width',1.8).attr('stroke-dasharray','5,3');

    g.selectAll('circle').data(clean).enter().append('circle')
      .attr('cx',d=>x(d[xKey])).attr('cy',d=>y(d[yKey])).attr('r',4)
      .attr('fill',d=> colorByCyl ? CYL_COLOR(d.cylinders) : '#4e79a7')
      .attr('opacity',0.65)
      .append('title').text(d=>`${d.name}\n${xLabel}: ${d[xKey]}\n${yLabel}: ${d[yKey]}\nCylinders: ${d.cylinders}`);

    svg.append('text').attr('x',m.left+w/2).attr('y',H-6)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text(xLabel);
    svg.append('text').attr('transform',`translate(14,${m.top+h/2}) rotate(-90)`)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text(yLabel);

    if (colorByCyl) {
      const cyls=[3,4,5,6,8], leg=svg.append('g').attr('transform',`translate(${W-m.right+8},${m.top})`);
      leg.append('text').attr('y',-8).attr('font-size','10px').attr('fill','#888').text('Cylinders');
      cyls.forEach((c,i)=>{
        leg.append('circle').attr('cx',7).attr('cy',i*20).attr('r',5).attr('fill',CYL_COLOR(c));
        leg.append('text').attr('x',18).attr('y',i*20+4).attr('font-size','11px').attr('fill','#444').text(c);
      });
    }
  },[xKey,yKey,colorByCyl]);
  return (
    <div className="dash-chart-wrap">
      <h3 className="dash-chart-title">{title}</h3>
      <p className="dash-chart-desc">{desc}</p>
      <div ref={ref} className="dash-chart-svg" />
    </div>
  );
}

function CylBarChart() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return; el.innerHTML='';
    const W = el.clientWidth||440, H=280;
    const m={top:20,right:20,bottom:40,left:55};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;
    const counts = d3.rollup(clean, v=>d3.mean(v,d=>d.mpg), d=>d.cylinders);
    const data=[...counts.entries()].sort((a,b)=>a[0]-b[0]);
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const x=d3.scaleBand().domain(data.map(d=>d[0])).range([0,w]).padding(0.35);
    const y=d3.scaleLinear().domain([0,d3.max(data,d=>d[1])+2]).range([h,0]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).tickFormat(d=>`${d} cyl`));
    g.append('g').call(d3.axisLeft(y).ticks(5));
    g.selectAll('rect').data(data).enter().append('rect')
      .attr('x',d=>x(d[0])).attr('width',x.bandwidth())
      .attr('y',d=>y(d[1])).attr('height',d=>h-y(d[1]))
      .attr('fill',d=>CYL_COLOR(d[0])).attr('rx',2);
    g.selectAll('.bar-label').data(data).enter().append('text')
      .attr('x',d=>x(d[0])+x.bandwidth()/2).attr('y',d=>y(d[1])-5)
      .attr('text-anchor','middle').attr('font-size','11px').attr('fill','#333')
      .text(d=>d[1].toFixed(1));
    svg.append('text').attr('x',m.left+w/2).attr('y',H-4)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Number of Cylinders');
    svg.append('text').attr('transform',`translate(14,${m.top+h/2}) rotate(-90)`)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Avg MPG');
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

function YearLineChart() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return; el.innerHTML='';
    const W = el.clientWidth||440, H=280;
    const m={top:20,right:20,bottom:40,left:55};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;
    const byYear=[...d3.rollup(clean,v=>d3.mean(v,d=>d.mpg),d=>d.year).entries()]
      .sort((a,b)=>a[0]-b[0]);
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const x=d3.scaleLinear().domain(d3.extent(byYear,d=>d[0])).range([0,w]);
    const y=d3.scaleLinear().domain([d3.min(byYear,d=>d[1])-1, d3.max(byYear,d=>d[1])+1]).range([h,0]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).tickFormat(d=>`'${d}`).ticks(6));
    g.append('g').call(d3.axisLeft(y).ticks(5));
    g.append('g').selectAll('line').data(y.ticks(5)).enter().append('line')
      .attr('x1',0).attr('x2',w).attr('y1',d=>y(d)).attr('y2',d=>y(d))
      .attr('stroke','#f4f4f4').attr('stroke-dasharray','3,3');
    const line=d3.line().x(d=>x(d[0])).y(d=>y(d[1])).curve(d3.curveMonotoneX);
    g.append('path').datum(byYear).attr('fill','none')
      .attr('stroke','#4e79a7').attr('stroke-width',2.5).attr('d',line);
    g.selectAll('circle').data(byYear).enter().append('circle')
      .attr('cx',d=>x(d[0])).attr('cy',d=>y(d[1])).attr('r',4)
      .attr('fill','#4e79a7').attr('stroke','#fff').attr('stroke-width',1.5)
      .append('title').text(d=>`Year 19${d[0]}: ${d[1].toFixed(1)} MPG avg`);
    svg.append('text').attr('x',m.left+w/2).attr('y',H-4)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Model Year (19xx)');
    svg.append('text').attr('transform',`translate(14,${m.top+h/2}) rotate(-90)`)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Avg MPG');
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

/* ── Bubble Chart: HP × MPG, size = Weight ────────────── */
function BubbleChart() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return; el.innerHTML = '';
    const W = el.clientWidth || 500, H = 340;
    const m = {top:30,right:130,bottom:50,left:55};
    const w = W-m.left-m.right, h = H-m.top-m.bottom;
    const svg = d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g = svg.append('g').attr('transform',`translate(${m.left},${m.top})`);

    const x = d3.scaleLinear().domain(d3.extent(clean,d=>d.horsepower)).nice().range([0,w]);
    const y = d3.scaleLinear().domain(d3.extent(clean,d=>d.mpg)).nice().range([h,0]);
    const r = d3.scaleSqrt().domain(d3.extent(clean,d=>d.weight)).range([3,18]);

    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).ticks(6))
      .selectAll('line,path').attr('stroke','#ddd');
    g.append('g').call(d3.axisLeft(y).ticks(5))
      .selectAll('line,path').attr('stroke','#ddd');
    g.append('g').selectAll('line').data(y.ticks(5)).enter().append('line')
      .attr('x1',0).attr('x2',w).attr('y1',d=>y(d)).attr('y2',d=>y(d))
      .attr('stroke','#f4f4f4').attr('stroke-dasharray','3,3');

    g.selectAll('circle').data(clean).enter().append('circle')
      .attr('cx',d=>x(d.horsepower)).attr('cy',d=>y(d.mpg))
      .attr('r',d=>r(d.weight))
      .attr('fill',d=>CYL_COLOR(d.cylinders)).attr('opacity',0.55)
      .attr('stroke',d=>CYL_COLOR(d.cylinders)).attr('stroke-width',0.8)
      .append('title').text(d=>`${d.name}\nHP: ${d.horsepower} | MPG: ${d.mpg}\nWeight: ${d.weight} lbs | ${d.cylinders} cyl`);

    svg.append('text').attr('x',m.left+w/2).attr('y',H-6)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Horsepower');
    svg.append('text').attr('transform',`translate(14,${m.top+h/2}) rotate(-90)`)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('MPG');

    // cylinder legend
    const leg = svg.append('g').attr('transform',`translate(${W-m.right+8},${m.top})`);
    leg.append('text').attr('y',-10).attr('font-size','10px').attr('fill','#888').text('Cylinders');
    [3,4,5,6,8].forEach((c,i)=>{
      leg.append('circle').attr('cx',8).attr('cy',i*20).attr('r',6).attr('fill',CYL_COLOR(c)).attr('opacity',0.7);
      leg.append('text').attr('x',20).attr('y',i*20+4).attr('font-size','11px').attr('fill','#444').text(c);
    });
    // size legend
    const sl = svg.append('g').attr('transform',`translate(${W-m.right+8},${m.top+120})`);
    sl.append('text').attr('y',-10).attr('font-size','10px').attr('fill','#888').text('Weight (lbs)');
    [2000,3000,4000].forEach((w2,i)=>{
      sl.append('circle').attr('cx',r(w2)).attr('cy',i*30+r(w2)).attr('r',r(w2))
        .attr('fill','none').attr('stroke','#aaa');
      sl.append('text').attr('x',r(w2)*2+4).attr('y',i*30+r(w2)+4).attr('font-size','10px').attr('fill','#777').text(w2);
    });
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

/* ── MPG Heatmap: Cylinders × Year ──────────────────── */
function MPGHeatmap() {
  const ref = useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return; el.innerHTML='';
    const cyls=[4,6,8];
    const years=[...new Set(clean.map(d=>d.year))].sort();
    const W=el.clientWidth||500, H=220;
    const m={top:30,right:80,bottom:45,left:60};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;

    const rollup=d3.rollup(clean,v=>d3.mean(v,d=>d.mpg),d=>d.cylinders,d=>d.year);
    const cells=[];
    cyls.forEach(c=>years.forEach(yr=>{
      const v=rollup.get(c)?.get(yr);
      if(v) cells.push({c,yr,v});
    }));

    const color=d3.scaleSequential(d3.interpolateYlOrRd).domain([d3.max(cells,d=>d.v),d3.min(cells,d=>d.v)]);
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);

    const xS=d3.scaleBand().domain(years).range([0,w]).padding(0.05);
    const yS=d3.scaleBand().domain(cyls).range([0,h]).padding(0.05);

    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(xS).tickFormat(d=>`'${d}`).tickValues(years.filter((_,i)=>i%2===0)));
    g.append('g').call(d3.axisLeft(yS).tickFormat(d=>`${d} cyl`));

    cells.forEach(({c,yr,v})=>{
      g.append('rect').attr('x',xS(yr)).attr('y',yS(c))
        .attr('width',xS.bandwidth()).attr('height',yS.bandwidth())
        .attr('fill',color(v)).attr('rx',2)
        .append('title').text(`${c} cyl, '${yr}: ${v.toFixed(1)} MPG avg`);
      if(xS.bandwidth()>20){
        g.append('text').attr('x',xS(yr)+xS.bandwidth()/2).attr('y',yS(c)+yS.bandwidth()/2+4)
          .attr('text-anchor','middle').attr('font-size','9px')
          .attr('fill',v<22?'#fff':'#333').text(v.toFixed(0));
      }
    });

    svg.append('text').attr('x',m.left+w/2).attr('y',H-4)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Model Year');
    svg.append('text').attr('transform',`translate(14,${m.top+h/2}) rotate(-90)`)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Cylinders');

    // colour bar
    const cbG=svg.append('g').attr('transform',`translate(${m.left+w+10},${m.top})`);
    const cbH=h, steps=20;
    d3.range(steps).forEach(i=>{
      cbG.append('rect').attr('x',0).attr('y',i*(cbH/steps)).attr('width',10).attr('height',cbH/steps+1)
        .attr('fill',color(d3.min(cells,d=>d.v)+(d3.max(cells,d=>d.v)-d3.min(cells,d=>d.v))*(1-i/(steps-1))));
    });
    cbG.append('text').attr('x',14).attr('y',10).attr('font-size','9px').attr('fill','#555').text('High');
    cbG.append('text').attr('x',14).attr('y',cbH).attr('font-size','9px').attr('fill','#555').text('Low');
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

/* ── Lollipop Chart: MPG by Origin/Year bracket ─────── */
function LollipopChart() {
  const ref = useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return; el.innerHTML='';
    // bin years into eras
    const eras = [{label:'1970–72',min:70,max:72},{label:'1973–75',min:73,max:75},
                  {label:'1976–78',min:76,max:78},{label:'1979–82',min:79,max:82}];
    const data = eras.map(e=>({
      label:e.label,
      mpg4: d3.mean(clean.filter(d=>d.cylinders===4&&d.year>=e.min&&d.year<=e.max),d=>d.mpg)||0,
      mpg6: d3.mean(clean.filter(d=>d.cylinders===6&&d.year>=e.min&&d.year<=e.max),d=>d.mpg)||0,
      mpg8: d3.mean(clean.filter(d=>d.cylinders===8&&d.year>=e.min&&d.year<=e.max),d=>d.mpg)||0,
    }));

    const W=el.clientWidth||500, H=280;
    const m={top:20,right:130,bottom:40,left:80};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);

    const y=d3.scaleBand().domain(data.map(d=>d.label)).range([0,h]).padding(0.4);
    const x=d3.scaleLinear().domain([0,42]).range([0,w]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).ticks(6));
    g.append('g').call(d3.axisLeft(y));
    g.append('g').selectAll('line').data(x.ticks(6)).enter().append('line')
      .attr('x1',d=>x(d)).attr('x2',d=>x(d)).attr('y1',0).attr('y2',h)
      .attr('stroke','#f0f0f0').attr('stroke-dasharray','3,3');

    const cyls=[{k:'mpg4',c:CYL_COLOR(4),off:-8},{k:'mpg6',c:CYL_COLOR(6),off:0},{k:'mpg8',c:CYL_COLOR(8),off:8}];
    data.forEach(d=>{
      cyls.forEach(({k,c,off})=>{
        const v=d[k]; if(!v) return;
        const yc=y(d.label)+y.bandwidth()/2+off;
        g.append('line').attr('x1',0).attr('x2',x(v)).attr('y1',yc).attr('y2',yc)
          .attr('stroke',c).attr('stroke-width',2).attr('opacity',0.6);
        g.append('circle').attr('cx',x(v)).attr('cy',yc).attr('r',6)
          .attr('fill',c).attr('stroke','#fff').attr('stroke-width',1.5)
          .append('title').text(`${d.label} | ${k.replace('mpg','')}-cyl: ${v.toFixed(1)} MPG`);
      });
    });

    const leg=svg.append('g').attr('transform',`translate(${m.left+w+10},${m.top})`);
    leg.append('text').attr('y',-8).attr('font-size','10px').attr('fill','#888').text('Cylinders');
    [{c:CYL_COLOR(4),l:'4 cyl'},{c:CYL_COLOR(6),l:'6 cyl'},{c:CYL_COLOR(8),l:'8 cyl'}].forEach(({c,l},i)=>{
      leg.append('circle').attr('cx',7).attr('cy',i*22).attr('r',6).attr('fill',c);
      leg.append('text').attr('x',18).attr('y',i*22+4).attr('font-size','11px').attr('fill','#444').text(l);
    });
    svg.append('text').attr('x',m.left+w/2).attr('y',H-5)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Average MPG');
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

const corr = (a, b) => {
  const ma=d3.mean(a), mb=d3.mean(b);
  return d3.sum(a.map((v,i)=>(v-ma)*(b[i]-mb))) /
    Math.sqrt(d3.sum(a.map(v=>(v-ma)**2))*d3.sum(b.map(v=>(v-mb)**2)));
};
const features=['horsepower','weight','displacement','acceleration','cylinders'];
const labels={horsepower:'HP',weight:'Weight',displacement:'Displacement',acceleration:'Accel',cylinders:'Cylinders'};
const mpg = clean.map(d=>d.mpg);
const corrData = features.map(f=>({ f, r: corr(clean.map(d=>d[f]), mpg) }));

function CorrBar() {
  const ref = useRef(null);
  useEffect(() => {
    const el=ref.current; if(!el) return; el.innerHTML='';
    const W=el.clientWidth||440, H=260;
    const m={top:20,right:20,bottom:40,left:100};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const y=d3.scaleBand().domain(corrData.map(d=>d.f)).range([0,h]).padding(0.3);
    const x=d3.scaleLinear().domain([-1,1]).range([0,w]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).ticks(5).tickFormat(d3.format('.1f')));
    g.append('g').call(d3.axisLeft(y).tickFormat(f=>labels[f]));
    g.append('line').attr('x1',x(0)).attr('x2',x(0)).attr('y1',0).attr('y2',h)
      .attr('stroke','#aaa').attr('stroke-dasharray','4,3');
    corrData.forEach(d=>{
      const col = d.r<0?'#e15759':'#4e79a7';
      g.append('rect')
        .attr('x',d.r<0?x(d.r):x(0)).attr('y',y(d.f))
        .attr('width',Math.abs(x(d.r)-x(0))).attr('height',y.bandwidth())
        .attr('fill',col).attr('rx',2);
      g.append('text').attr('x',d.r<0?x(d.r)-4:x(d.r)+4).attr('y',y(d.f)+y.bandwidth()/2+4)
        .attr('text-anchor',d.r<0?'end':'start').attr('font-size','11px').attr('fill','#333')
        .text(d.r.toFixed(2));
    });
    svg.append('text').attr('x',m.left+w/2).attr('y',H-4)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Correlation with MPG');
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

export default function CarsPage() {
  return (
    <div className="dash-page">
      <div className="dash-hero" style={{background:'#1b3a4b'}}>
        <div className="container">
          <span className="dash-icon">🚗</span>
          <div>
            <h1>Auto MPG Analysis</h1>
            <p className="dash-subtitle">What makes a car fuel-efficient? Exploring horsepower, weight, cylinders and more across 200+ vehicles from the 1970s–80s.</p>
          </div>
        </div>
      </div>

      <div className="container dash-body">

        <section className="dash-section">
          <h2>About the Dataset</h2>
          <p>The <strong>Auto MPG dataset</strong> comes from the UCI Machine Learning Repository. It records fuel efficiency (miles per gallon) and technical specs for cars sold in the US market from 1970 to 1982 — a period when the oil crisis forced manufacturers to make more efficient cars.</p>
          <p style={{marginTop:'0.75rem'}}>Each row represents one car model. We have <strong>6 numeric features</strong> to explore against fuel efficiency (MPG):</p>
          <div className="dash-measure-grid">
            {[
              {key:'MPG', desc:'Miles per gallon — how far the car goes on one gallon of fuel. Higher = more efficient.'},
              {key:'Horsepower', desc:'Engine power. More power usually means more fuel burned.'},
              {key:'Weight', desc:'Car weight in pounds. Heavier cars need more energy to move.'},
              {key:'Displacement', desc:'Engine size in cubic inches. Bigger engine = more fuel consumption.'},
              {key:'Acceleration', desc:'Seconds to reach 60 mph from standstill. Higher = slower acceleration.'},
              {key:'Cylinders', desc:'Number of engine cylinders: 4, 6, or 8 are most common.'},
            ].map(m=>(
              <div key={m.key} className="dash-measure-card"><strong>{m.key}</strong><p>{m.desc}</p></div>
            ))}
          </div>
        </section>

        <section className="dash-section">
          <div className="dash-kpi-row">
            {[{val:`${clean.length}`,label:'Cars'},{val:'13',label:'Model Years'},{val:`${d3.mean(clean,d=>d.mpg).toFixed(1)}`,label:'Avg MPG'},{val:`${d3.max(clean,d=>d.mpg)}`,label:'Best MPG'},{val:`${d3.min(clean,d=>d.mpg)}`,label:'Worst MPG'}]
              .map(k=><div key={k.label} className="dash-kpi"><span className="kpi-val">{k.val}</span><span className="kpi-lbl">{k.label}</span></div>)}
          </div>
        </section>

        <section className="dash-section">
          <h2>MPG vs Horsepower</h2>
          <p>More powerful engines burn more fuel. The scatter below shows a clear <strong>negative relationship</strong> — as horsepower goes up, MPG goes down. The gold dashed line is the trend line (regression line).</p>
          <Scatter xKey="horsepower" yKey="mpg" xLabel="Horsepower" yLabel="MPG" colorByCyl
            title="" desc="" />
          <div className="dash-insight">Cars with 4 cylinders (blue) cluster at low horsepower + high MPG. 8-cylinder cars (purple) sit at high horsepower + low MPG. The pattern is almost perfectly linear.</div>
        </section>

        <section className="dash-section">
          <h2>MPG vs Weight</h2>
          <p>Weight has the strongest relationship with fuel efficiency in this dataset. The heavier the car, the more energy is needed to move it — and the worse the MPG.</p>
          <Scatter xKey="weight" yKey="mpg" xLabel="Weight (lbs)" yLabel="MPG" colorByCyl
            title="" desc="" />
          <div className="dash-insight">American muscle cars from the early 1970s (often above 4,000 lbs) get under 15 MPG. Japanese compacts from the late 1970s (under 2,500 lbs) frequently exceed 35 MPG.</div>
        </section>

        <section className="dash-section">
          <h2>MPG vs Displacement</h2>
          <p><strong>Displacement</strong> is the total volume swept by all the engine's pistons. It is essentially a measure of engine size. Bigger engines use more fuel.</p>
          <Scatter xKey="displacement" yKey="mpg" xLabel="Displacement (cu. in.)" yLabel="MPG" colorByCyl
            title="" desc="" />
          <div className="dash-insight">Almost no 8-cylinder car exceeds 25 MPG. Almost every 4-cylinder car with small displacement exceeds 25 MPG. Displacement and horsepower are strongly correlated with each other too — bigger engine = more power.</div>
        </section>

        <section className="dash-section">
          <h2>MPG vs Acceleration</h2>
          <p>Acceleration here is measured as <em>seconds to reach 60 mph</em>. A higher number means slower acceleration. Surprisingly, <strong>slow cars tend to get better MPG</strong> — because they have smaller, less powerful engines.</p>
          <Scatter xKey="acceleration" yKey="mpg" xLabel="0–60 mph (seconds)" yLabel="MPG" colorByCyl
            title="" desc="" />
          <div className="dash-insight">Unlike the other features, the relationship here is positive — more seconds to 60 = better fuel economy. This seems counterintuitive until you realise that fast cars have big engines, which burn more fuel.</div>
        </section>

        <section className="dash-section">
          <h2>Average MPG by Number of Cylinders</h2>
          <p>This bar chart directly compares fuel efficiency across cylinder counts. Fewer cylinders = smaller engine = better MPG.</p>
          <div className="dash-chart-wrap" style={{maxWidth:480}}>
            <CylBarChart/>
          </div>
          <div className="dash-insight">4-cylinder cars average around 30 MPG. 8-cylinder cars average around 15 MPG — half as efficient. The 3-cylinder Mazda RX-2 is a rotary engine outlier.</div>
        </section>

        <section className="dash-section">
          <h2>Bubble Chart — Three Variables at Once</h2>
          <p>A <strong>bubble chart</strong> extends a scatter plot by encoding a third variable in the <strong>size</strong> of each dot. Here: x = horsepower, y = MPG, and bubble size = car weight. Bigger circles are heavier cars. Colour = cylinder count.</p>
          <div className="dash-chart-wrap">
            <BubbleChart/>
          </div>
          <div className="dash-insight">The heaviest, most powerful, most-cylindered cars sit in the bottom-right (large purple circles). Lightweight 4-cylinder cars cluster top-left as small blue bubbles. The three dimensions tell a perfectly consistent story: power, weight, and cylinders all move together — and all hurt fuel economy.</div>
        </section>

        <section className="dash-section">
          <h2>MPG Heatmap — Cylinders × Model Year</h2>
          <p>A <strong>heatmap</strong> uses colour to show a third dimension across a grid. Here each row is a cylinder count, each column is a model year, and the colour shows average MPG. Darker red = lower MPG, lighter yellow = higher MPG.</p>
          <div className="dash-chart-wrap">
            <MPGHeatmap/>
          </div>
          <div className="dash-insight">The top-left corner (8 cylinders, early 1970s) is the darkest red — averaging under 15 MPG. The bottom-right (4 cylinders, early 1980s) is bright yellow — above 30 MPG. You can see the improvement year-by-year within every cylinder group, reflecting the industry-wide efficiency push after the oil crisis.</div>
        </section>

        <section className="dash-section">
          <h2>Lollipop Chart — MPG by Era and Cylinder Count</h2>
          <p>A <strong>lollipop chart</strong> is a cleaner alternative to a bar chart for comparing multiple series. Each dot is the average MPG for one cylinder group in one era. The line from the axis to the dot shows the value clearly without the visual weight of a full bar.</p>
          <div className="dash-chart-wrap">
            <LollipopChart/>
          </div>
          <div className="dash-insight">Across every era, 4-cylinder cars outperform 6- and 8-cylinder cars by a wide margin. The gap between 4-cyl and 8-cyl actually widens over time — 4-cylinder cars improved much faster. By the 1979–82 era, a 4-cylinder car averaged more than twice the MPG of an 8-cylinder car.</div>
        </section>

        <section className="dash-section">
          <h2>Fuel Economy Improved Over Time</h2>
          <p>After the 1973 oil crisis, US regulations pushed manufacturers to make more efficient vehicles. This line chart tracks average MPG by model year.</p>
          <div className="dash-chart-wrap" style={{maxWidth:520}}>
            <YearLineChart/>
          </div>
          <div className="dash-insight">Average MPG rose from about 17 in 1970 to over 30 by 1982 — nearly doubling in 12 years. This reflects both regulation (the CAFE standards) and consumer preference shifts after the oil shocks.</div>
        </section>

        <section className="dash-section">
          <h2>What Correlates Most with MPG?</h2>
          <p>Correlation measures how strongly two variables move together. A value of <strong>−1</strong> means perfect negative relationship (as one goes up, the other goes down). <strong>+1</strong> means perfect positive relationship.</p>
          <div className="dash-chart-wrap" style={{maxWidth:480}}>
            <CorrBar/>
          </div>
          <div className="dash-insight"><strong>Weight</strong> has the strongest negative correlation with MPG (−0.83). Horsepower and displacement are close behind. Acceleration is positively correlated (+0.42) — slower cars are more fuel-efficient.</div>
        </section>

        <section className="dash-section">
          <h2>Key Takeaways</h2>
          <div className="dash-findings">
            {[
              {n:'1',title:'Weight is the #1 predictor',body:'Heavier cars consistently get worse fuel economy. If you could only know one thing about a car, its weight would give you the best guess of its MPG.'},
              {n:'2',title:'Cylinders and displacement tell a similar story',body:'Both are proxies for engine size. The more cylinders, the bigger the engine, the more fuel it burns. 4-cylinder cars average twice the MPG of 8-cylinder cars.'},
              {n:'3',title:'Horsepower trades off with efficiency',body:'Every extra unit of power comes at a fuel cost. The fastest, most powerful cars in this dataset are also the thirstiest.'},
              {n:'4',title:'Fuel economy improved dramatically after 1973',body:'The OPEC oil embargo forced a rapid shift. Average fleet MPG nearly doubled from 1970 to 1982 — a pace of improvement the industry has not matched since.'},
            ].map(f=>(
              <div key={f.n} className="dash-finding">
                <span className="finding-num">{f.n}</span>
                <div><strong>{f.title}</strong><p>{f.body}</p></div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
