import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { irisData } from '../data/irisData';
import './ProjectDashboard.css';

const COLORS = { setosa: '#4e79a7', versicolor: '#f28e2b', virginica: '#59a14f' };
const SPECIES = ['setosa', 'versicolor', 'virginica'];

function ScatterPlot({ xKey, yKey, xLabel, yLabel, title, desc }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '';
    const W = el.clientWidth || 420, H = 320;
    const m = { top: 30, right: 120, bottom: 50, left: 50 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    const svg = d3.select(el).append('svg').attr('width', W).attr('height', H);
    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

    const x = d3.scaleLinear().domain(d3.extent(irisData, d => d[xKey])).nice().range([0, w]);
    const y = d3.scaleLinear().domain(d3.extent(irisData, d => d[yKey])).nice().range([h, 0]);

    g.append('g').attr('transform', `translate(0,${h})`).call(d3.axisBottom(x).ticks(6))
      .call(g2 => g2.select('.domain').attr('stroke', '#ccc'))
      .call(g2 => g2.selectAll('line').attr('stroke', '#ccc'));
    g.append('g').call(d3.axisLeft(y).ticks(5))
      .call(g2 => g2.select('.domain').attr('stroke', '#ccc'))
      .call(g2 => g2.selectAll('line').attr('stroke', '#ccc'));

    g.append('g').selectAll('line')
      .data(y.ticks(5)).enter().append('line')
      .attr('x1',0).attr('x2',w).attr('y1',d=>y(d)).attr('y2',d=>y(d))
      .attr('stroke','#f0f0f0').attr('stroke-dasharray','3,3');

    g.selectAll('circle').data(irisData).enter().append('circle')
      .attr('cx', d => x(d[xKey])).attr('cy', d => y(d[yKey]))
      .attr('r', 5).attr('fill', d => COLORS[d.species]).attr('opacity', 0.8)
      .append('title').text(d => `${d.species}\n${xLabel}: ${d[xKey]}\n${yLabel}: ${d[yKey]}`);

    svg.append('text').attr('x', m.left + w / 2).attr('y', H - 6)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text(xLabel);
    svg.append('text').attr('transform',`translate(14,${m.top + h/2}) rotate(-90)`)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text(yLabel);

    const leg = svg.append('g').attr('transform', `translate(${W - m.right + 10},${m.top})`);
    SPECIES.forEach((s, i) => {
      leg.append('circle').attr('cx',7).attr('cy',i*22).attr('r',6).attr('fill',COLORS[s]);
      leg.append('text').attr('x',18).attr('y',i*22+4).attr('font-size','11px').attr('fill','#444').text(s);
    });
  }, [xKey, yKey]);

  return (
    <div className="dash-chart-wrap">
      <h3 className="dash-chart-title">{title}</h3>
      <p className="dash-chart-desc">{desc}</p>
      <div ref={ref} className="dash-chart-svg" />
    </div>
  );
}

function BoxPlot({ feature, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '';
    const W = el.clientWidth || 420, H = 300;
    const m = { top: 20, right: 20, bottom: 50, left: 55 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    const svg = d3.select(el).append('svg').attr('width', W).attr('height', H);
    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

    const x = d3.scaleBand().domain(SPECIES).range([0, w]).padding(0.3);
    const allVals = irisData.map(d => d[feature]);
    const y = d3.scaleLinear().domain([d3.min(allVals) - 0.2, d3.max(allVals) + 0.2]).range([h, 0]);

    g.append('g').attr('transform', `translate(0,${h})`).call(d3.axisBottom(x));
    g.append('g').call(d3.axisLeft(y).ticks(5));

    SPECIES.forEach(sp => {
      const vals = irisData.filter(d => d.species === sp).map(d => d[feature]).sort(d3.ascending);
      const q1 = d3.quantile(vals, 0.25);
      const med = d3.quantile(vals, 0.5);
      const q3 = d3.quantile(vals, 0.75);
      const iqr = q3 - q1;
      const lo = Math.max(d3.min(vals), q1 - 1.5 * iqr);
      const hi = Math.min(d3.max(vals), q3 + 1.5 * iqr);
      const xc = x(sp) + x.bandwidth() / 2;
      const bw = x.bandwidth();
      g.append('line').attr('x1',xc).attr('x2',xc).attr('y1',y(lo)).attr('y2',y(hi))
        .attr('stroke',COLORS[sp]).attr('stroke-width',1.5);
      g.append('rect').attr('x',x(sp)).attr('width',bw)
        .attr('y',y(q3)).attr('height',y(q1)-y(q3))
        .attr('fill',COLORS[sp]).attr('opacity',0.6).attr('stroke',COLORS[sp]);
      g.append('line').attr('x1',x(sp)).attr('x2',x(sp)+bw)
        .attr('y1',y(med)).attr('y2',y(med)).attr('stroke','#fff').attr('stroke-width',2.5);
      [[lo,'min'],[hi,'max']].forEach(([v]) => {
        g.append('line').attr('x1',xc-bw/4).attr('x2',xc+bw/4)
          .attr('y1',y(v)).attr('y2',y(v)).attr('stroke',COLORS[sp]).attr('stroke-width',1.5);
      });
    });

    svg.append('text').attr('x', m.left + w/2).attr('y', H - 6)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Species');
    svg.append('text').attr('transform',`translate(14,${m.top+h/2}) rotate(-90)`)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text(label);
  }, [feature, label]);

  return <div ref={ref} className="dash-chart-svg" />;
}

function HistogramPanel() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '';
    const W = el.clientWidth || 420, H = 300;
    const m = { top: 20, right: 20, bottom: 50, left: 50 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    const svg = d3.select(el).append('svg').attr('width', W).attr('height', H);
    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);
    const vals = irisData.map(d => d.pl);
    const x = d3.scaleLinear().domain(d3.extent(vals)).nice().range([0, w]);
    const bins = d3.bin().domain(x.domain()).thresholds(x.ticks(15))(vals);
    const y = d3.scaleLinear().domain([0, d3.max(bins, d => d.length)]).range([h, 0]);
    g.append('g').attr('transform', `translate(0,${h})`).call(d3.axisBottom(x).ticks(8));
    g.append('g').call(d3.axisLeft(y).ticks(5));
    g.selectAll('rect').data(bins).enter().append('rect')
      .attr('x', d => x(d.x0) + 1).attr('width', d => Math.max(0, x(d.x1) - x(d.x0) - 2))
      .attr('y', d => y(d.length)).attr('height', d => h - y(d.length))
      .attr('fill', '#4e79a7').attr('opacity', 0.75);
    svg.append('text').attr('x', m.left + w/2).attr('y', H - 6)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Petal Length (cm)');
  }, []);
  return <div ref={ref} className="dash-chart-svg" />;
}

const stats = SPECIES.map(sp => {
  const rows = irisData.filter(d => d.species === sp);
  const avg = k => (rows.reduce((s,d) => s+d[k],0)/rows.length).toFixed(2);
  return { sp, sl: avg('sl'), sw: avg('sw'), pl: avg('pl'), pw: avg('pw'), n: rows.length };
});

export default function IrisPage() {
  return (
    <div className="dash-page">
      <div className="dash-hero" style={{background:'#1a2744'}}>
        <div className="container">
          <span className="dash-icon">🌸</span>
          <div>
            <h1>Iris Flower Dataset Analysis</h1>
            <p className="dash-subtitle">Exploring sepal and petal measurements across 3 species — a classic introduction to data analytics</p>
          </div>
        </div>
      </div>

      <div className="container dash-body">

        {/* Explainer */}
        <section className="dash-section">
          <h2>What is the Iris Dataset?</h2>
          <p>The Iris dataset is one of the most famous datasets in data science. It was introduced by statistician Ronald Fisher in 1936. It contains <strong>150 flower samples</strong> — 50 from each of three species of iris flowers:</p>
          <div className="dash-species-cards">
            {SPECIES.map(s => (
              <div key={s} className="dash-species-card" style={{borderTopColor: COLORS[s]}}>
                <span className="species-dot" style={{background: COLORS[s]}} />
                <strong style={{textTransform:'capitalize'}}>{s}</strong>
              </div>
            ))}
          </div>
          <p style={{marginTop:'1rem'}}>For each flower, four measurements were recorded:</p>
          <div className="dash-measure-grid">
            {[
              {key:'Sepal Length (SL)', desc:'Length of the outer petal-like leaves that protect the flower bud'},
              {key:'Sepal Width (SW)',  desc:'Width of those same outer leaves'},
              {key:'Petal Length (PL)', desc:'Length of the inner colourful petals'},
              {key:'Petal Width (PW)',  desc:'Width of those inner petals'},
            ].map(m => (
              <div key={m.key} className="dash-measure-card">
                <strong>{m.key}</strong>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
          <p style={{marginTop:'1rem'}}>The goal: can we tell which species a flower belongs to just from these four numbers? Spoiler — yes, and the charts below show exactly how.</p>
        </section>

        {/* KPI row */}
        <section className="dash-section">
          <h2>Dataset at a Glance</h2>
          <div className="dash-kpi-row">
            {[
              {val:'150', label:'Total Flowers'},
              {val:'3', label:'Species'},
              {val:'4', label:'Measurements'},
              {val:'50', label:'Samples per Species'},
            ].map(k => (
              <div key={k.label} className="dash-kpi"><span className="kpi-val">{k.val}</span><span className="kpi-lbl">{k.label}</span></div>
            ))}
          </div>
        </section>

        {/* Species average table */}
        <section className="dash-section">
          <h2>Average Measurements by Species</h2>
          <p>The table below shows the average of each measurement per species. Already you can see a pattern — <em>virginica</em> tends to be the largest, and <em>setosa</em> the smallest.</p>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr><th>Species</th><th>Sepal Length</th><th>Sepal Width</th><th>Petal Length</th><th>Petal Width</th><th>Samples</th></tr>
              </thead>
              <tbody>
                {stats.map(r => (
                  <tr key={r.sp}>
                    <td><span className="species-dot" style={{background:COLORS[r.sp]}} />{r.sp}</td>
                    <td>{r.sl} cm</td><td>{r.sw} cm</td><td>{r.pl} cm</td><td>{r.pw} cm</td><td>{r.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Scatter plots */}
        <section className="dash-section">
          <h2>Scatter Plots — Do the Measurements Separate the Species?</h2>
          <p>A scatter plot places every flower as a dot. The x-axis is one measurement, the y-axis is another. Dots are coloured by species. If the colour clusters separate, the measurements can tell the species apart.</p>
          <div className="dash-chart-grid">
            <ScatterPlot xKey="sl" yKey="sw" xLabel="Sepal Length (cm)" yLabel="Sepal Width (cm)"
              title="Sepal Length vs Sepal Width"
              desc="Sepal measurements partially separate the species, but there is overlap — especially between versicolor and virginica." />
            <ScatterPlot xKey="pl" yKey="pw" xLabel="Petal Length (cm)" yLabel="Petal Width (cm)"
              title="Petal Length vs Petal Width"
              desc="This is the best view. Setosa sits completely separate (small petals). Versicolor and virginica are well separated but still touch slightly." />
            <ScatterPlot xKey="sl" yKey="pl" xLabel="Sepal Length (cm)" yLabel="Petal Length (cm)"
              title="Sepal Length vs Petal Length"
              desc="A strong diagonal pattern: flowers with longer sepals also tend to have longer petals. Virginica dominates the top-right corner." />
            <ScatterPlot xKey="sw" yKey="pw" xLabel="Sepal Width (cm)" yLabel="Petal Width (cm)"
              title="Sepal Width vs Petal Width"
              desc="Sepal width alone is not very useful (setosa actually has wider sepals than the others), but petal width clearly separates the three groups." />
          </div>
        </section>

        {/* Box plots */}
        <section className="dash-section">
          <h2>Box Plots — Spread of Each Measurement</h2>
          <p>A box plot shows the <strong>range</strong> and <strong>middle 50%</strong> of values for each species. The box covers the middle half of the data; the line in the box is the median; the whiskers show the full range (excluding outliers).</p>
          <div className="dash-chart-grid">
            {[
              {feature:'sl', label:'Sepal Length (cm)', title:'Sepal Length by Species'},
              {feature:'sw', label:'Sepal Width (cm)',  title:'Sepal Width by Species'},
              {feature:'pl', label:'Petal Length (cm)', title:'Petal Length by Species'},
              {feature:'pw', label:'Petal Width (cm)',  title:'Petal Width by Species'},
            ].map(b => (
              <div key={b.feature} className="dash-chart-wrap">
                <h3 className="dash-chart-title">{b.title}</h3>
                <BoxPlot feature={b.feature} label={b.label} />
              </div>
            ))}
          </div>
          <div className="dash-insight">
            <strong>Key insight:</strong> Petal length and petal width show the clearest separation — the three boxes barely overlap. Sepal width is the hardest feature to use because setosa (surprisingly) has the widest sepals even though it is the smallest species overall.
          </div>
        </section>

        {/* Histogram */}
        <section className="dash-section">
          <h2>Petal Length Distribution</h2>
          <p>A histogram counts how many flowers fall into each size bucket. The bimodal (two-humped) shape below is a telltale sign that two distinct groups are hiding in the data — setosa on the left, and versicolor + virginica on the right.</p>
          <div className="dash-chart-wrap" style={{maxWidth:520}}>
            <HistogramPanel />
          </div>
        </section>

        {/* Summary */}
        <section className="dash-section">
          <h2>What We Learned</h2>
          <div className="dash-findings">
            {[
              {n:'1', title:'Petal beats sepal', body:'Petal measurements (length and width) separate the three species far better than sepal measurements. If you only had one pair of measurements, choose petal.'},
              {n:'2', title:'Setosa is easy to spot', body:'Iris setosa has tiny petals — always under 2 cm long. You can identify it with a single glance at petal length alone.'},
              {n:'3', title:'Virginica vs Versicolor', body:'These two species overlap slightly, meaning no single measurement can perfectly separate them. A combination of petal length and petal width gets closest.'},
              {n:'4', title:'Size scales together', body:'Flowers that are large in one dimension tend to be large in all dimensions — a principle called positive correlation. Virginica is consistently the biggest.'},
            ].map(f => (
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
