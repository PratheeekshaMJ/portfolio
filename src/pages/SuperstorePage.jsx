import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { orders, monthlySales } from '../data/superstoreData';
import './ProjectDashboard.css';

const CAT_COLOR = d3.scaleOrdinal()
  .domain(['Furniture','Office Supplies','Technology'])
  .range(['#4e79a7','#f28e2b','#59a14f']);

const SEG_COLOR = d3.scaleOrdinal()
  .domain(['Consumer','Corporate','Home Office'])
  .range(['#4e79a7','#e15759','#f28e2b']);

const REG_COLOR = d3.scaleOrdinal()
  .domain(['West','East','Central','South'])
  .range(['#59a14f','#4e79a7','#f28e2b','#e15759']);

// Aggregations
const salesByCategory = d3.rollups(orders, v => ({
  sales: d3.sum(v, d => d.sales),
  profit: d3.sum(v, d => d.profit),
  qty: d3.sum(v, d => d.qty),
}), d => d.category).map(([cat, v]) => ({ cat, ...v }));

const salesBySubcat = d3.rollups(orders, v => ({
  sales: d3.sum(v, d => d.sales),
  profit: d3.sum(v, d => d.profit),
}), d => d.sub).map(([sub, v]) => ({ sub, ...v })).sort((a,b)=>b.sales-a.sales).slice(0,10);

const salesByRegion = d3.rollups(orders, v => ({
  sales: d3.sum(v, d => d.sales),
  profit: d3.sum(v, d => d.profit),
}), d => d.region).map(([region, v]) => ({ region, ...v }));

const salesBySegment = d3.rollups(orders, v => ({
  sales: d3.sum(v, d => d.sales),
  profit: d3.sum(v, d => d.profit),
}), d => d.segment).map(([segment, v]) => ({ segment, ...v }));

const totalSales = d3.sum(orders, d => d.sales);
const totalProfit = d3.sum(orders, d => d.profit);
const profitMargin = (totalProfit / totalSales * 100).toFixed(1);

function CategoryBarChart() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return; el.innerHTML='';
    const W=el.clientWidth||440, H=260;
    const m={top:20,right:20,bottom:40,left:130};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const y=d3.scaleBand().domain(salesByCategory.map(d=>d.cat)).range([0,h]).padding(0.3);
    const x=d3.scaleLinear().domain([0,d3.max(salesByCategory,d=>d.sales)]).nice().range([0,w]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).ticks(4).tickFormat(d=>d>=1000?`$${(d/1000).toFixed(0)}k`:`$${d}`));
    g.append('g').call(d3.axisLeft(y));
    salesByCategory.forEach(d=>{
      g.append('rect').attr('x',0).attr('y',y(d.cat)).attr('width',x(d.sales))
        .attr('height',y.bandwidth()).attr('fill',CAT_COLOR(d.cat)).attr('rx',2);
      g.append('text').attr('x',x(d.sales)+5).attr('y',y(d.cat)+y.bandwidth()/2+4)
        .attr('font-size','11px').attr('fill','#333').text(`$${(d.sales/1000).toFixed(0)}k`);
    });
    svg.append('text').attr('x',m.left+w/2).attr('y',H-4)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Total Sales');
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

function SalesTrendChart() {
  const ref = useRef(null);
  useEffect(() => {
    const el=ref.current; if(!el) return; el.innerHTML='';
    const W=el.clientWidth||600, H=300;
    const m={top:20,right:80,bottom:55,left:60};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const x=d3.scalePoint().domain(monthlySales.map(d=>d.month)).range([0,w]);
    const y=d3.scaleLinear().domain([0,d3.max(monthlySales,d=>d.sales)*1.1]).range([h,0]);
    const y2=d3.scaleLinear().domain([0,d3.max(monthlySales,d=>d.profit)*1.1]).range([h,0]);
    const tickEvery=3;
    g.append('g').attr('transform',`translate(0,${h})`).call(
      d3.axisBottom(x).tickValues(monthlySales.filter((_,i)=>i%tickEvery===0).map(d=>d.month))
    ).selectAll('text').attr('transform','rotate(-35)').style('text-anchor','end').attr('font-size','10px');
    g.append('g').call(d3.axisLeft(y).ticks(5).tickFormat(d=>`$${(d/1000).toFixed(0)}k`));
    g.append('g').attr('transform',`translate(${w},0)`).call(d3.axisRight(y2).ticks(5).tickFormat(d=>`$${(d/1000).toFixed(0)}k`))
      .selectAll('text').attr('fill','#59a14f');
    g.append('g').selectAll('line').data(y.ticks(5)).enter().append('line')
      .attr('x1',0).attr('x2',w).attr('y1',d=>y(d)).attr('y2',d=>y(d))
      .attr('stroke','#f4f4f4').attr('stroke-dasharray','3,3');
    const salesLine=d3.line().x(d=>x(d.month)).y(d=>y(d.sales)).curve(d3.curveMonotoneX);
    const profitLine=d3.line().x(d=>x(d.month)).y(d=>y2(d.profit)).curve(d3.curveMonotoneX);
    // Area under sales
    const area=d3.area().x(d=>x(d.month)).y0(h).y1(d=>y(d.sales)).curve(d3.curveMonotoneX);
    g.append('path').datum(monthlySales).attr('d',area).attr('fill','#4e79a7').attr('opacity',0.08);
    g.append('path').datum(monthlySales).attr('fill','none').attr('stroke','#4e79a7').attr('stroke-width',2.5).attr('d',salesLine);
    g.append('path').datum(monthlySales).attr('fill','none').attr('stroke','#59a14f').attr('stroke-width',2).attr('stroke-dasharray','5,3').attr('d',profitLine);
    const leg=svg.append('g').attr('transform',`translate(${m.left+10},${m.top+5})`);
    [{c:'#4e79a7',l:'Sales'},{c:'#59a14f',l:'Profit',dash:true}].forEach(({c,l,dash},i)=>{
      const lx=i*90;
      leg.append('line').attr('x1',lx).attr('x2',lx+20).attr('y1',0).attr('y2',0)
        .attr('stroke',c).attr('stroke-width',2.5).attr('stroke-dasharray',dash?'5,3':null);
      leg.append('text').attr('x',lx+24).attr('y',4).attr('font-size','11px').attr('fill','#444').text(l);
    });
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

function RegionDonut() {
  const ref = useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return; el.innerHTML='';
    const W=el.clientWidth||340, H=280;
    const r=Math.min(W,H)/2-20;
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${W/2-50},${H/2})`);
    const pie=d3.pie().value(d=>d.sales)(salesByRegion);
    const arc=d3.arc().innerRadius(r*0.5).outerRadius(r);
    pie.forEach(d=>{
      g.append('path').attr('d',arc(d)).attr('fill',REG_COLOR(d.data.region)).attr('stroke','#fff').attr('stroke-width',2);
      const c=arc.centroid(d);
      const pct=(d.data.sales/totalSales*100).toFixed(0);
      if(pct>8){
        g.append('text').attr('x',c[0]).attr('y',c[1]).attr('text-anchor','middle')
          .attr('font-size','11px').attr('fill','#fff').attr('font-weight','bold').text(`${pct}%`);
      }
    });
    const leg=svg.append('g').attr('transform',`translate(${W/2+20},${H/2-40})`);
    salesByRegion.forEach(({region,sales},i)=>{
      leg.append('rect').attr('x',0).attr('y',i*22).attr('width',12).attr('height',12).attr('fill',REG_COLOR(region)).attr('rx',2);
      leg.append('text').attr('x',18).attr('y',i*22+10).attr('font-size','11px').attr('fill','#444').text(`${region} ($${(sales/1000).toFixed(0)}k)`);
    });
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

function SubcatChart() {
  const ref = useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return; el.innerHTML='';
    const W=el.clientWidth||480, H=320;
    const m={top:10,right:20,bottom:40,left:130};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const y=d3.scaleBand().domain(salesBySubcat.map(d=>d.sub)).range([0,h]).padding(0.25);
    const x=d3.scaleLinear().domain([0,d3.max(salesBySubcat,d=>d.sales)]).nice().range([0,w]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).ticks(4).tickFormat(d=>`$${(d/1000).toFixed(0)}k`));
    g.append('g').call(d3.axisLeft(y));
    salesBySubcat.forEach(d=>{
      const profitable=d.profit>0;
      g.append('rect').attr('x',0).attr('y',y(d.sub)).attr('width',x(d.sales))
        .attr('height',y.bandwidth()).attr('fill',profitable?'#4e79a7':'#e15759').attr('rx',2).attr('opacity',0.85);
      g.append('text').attr('x',x(d.sales)+4).attr('y',y(d.sub)+y.bandwidth()/2+4)
        .attr('font-size','10px').attr('fill',profitable?'#27ae60':'#c0392b')
        .text(`${profitable?'+':'-'}$${Math.abs(d.profit/1000).toFixed(1)}k`);
    });
    const leg=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    [{c:'#4e79a7',l:'Profitable'},{c:'#e15759',l:'Loss-making'}].forEach(({c,l},i)=>{
      leg.append('rect').attr('x',i*100).attr('y',0).attr('width',12).attr('height',10).attr('fill',c).attr('rx',2);
      leg.append('text').attr('x',i*100+16).attr('y',9).attr('font-size','11px').attr('fill','#444').text(l);
    });
    svg.append('text').attr('x',m.left+w/2).attr('y',H-4)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Total Sales (profit shown as label)');
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

function SegmentProfitBar() {
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return; el.innerHTML='';
    const W=el.clientWidth||380, H=240;
    const m={top:20,right:20,bottom:40,left:110};
    const w=W-m.left-m.right, h=H-m.top-m.bottom;
    const svg=d3.select(el).append('svg').attr('width',W).attr('height',H);
    const g=svg.append('g').attr('transform',`translate(${m.left},${m.top})`);
    const y=d3.scaleBand().domain(salesBySegment.map(d=>d.segment)).range([0,h]).padding(0.3);
    const x=d3.scaleLinear().domain([0,d3.max(salesBySegment,d=>d.profit)]).nice().range([0,w]);
    g.append('g').attr('transform',`translate(0,${h})`).call(d3.axisBottom(x).ticks(4).tickFormat(d=>`$${(d/1000).toFixed(0)}k`));
    g.append('g').call(d3.axisLeft(y));
    salesBySegment.forEach(d=>{
      const margin=(d.profit/d.sales*100).toFixed(0);
      g.append('rect').attr('x',0).attr('y',y(d.segment)).attr('width',x(d.profit))
        .attr('height',y.bandwidth()).attr('fill',SEG_COLOR(d.segment)).attr('rx',2);
      g.append('text').attr('x',x(d.profit)+5).attr('y',y(d.segment)+y.bandwidth()/2+4)
        .attr('font-size','11px').attr('fill','#333').text(`${margin}% margin`);
    });
    svg.append('text').attr('x',m.left+w/2).attr('y',H-4)
      .attr('text-anchor','middle').attr('font-size','12px').attr('fill','#555').text('Total Profit');
  },[]);
  return <div ref={ref} className="dash-chart-svg"/>;
}

export default function SuperstorePage() {
  return (
    <div className="dash-page">
      <div className="dash-hero" style={{background:'#1a3a2a'}}>
        <div className="container">
          <span className="dash-icon">🏪</span>
          <div>
            <h1>Sample Superstore Sales Dashboard</h1>
            <p className="dash-subtitle">Retail performance analysis across categories, regions, and customer segments — from 2021 to 2024</p>
          </div>
        </div>
      </div>

      <div className="container dash-body">

        <section className="dash-section">
          <h2>About the Dataset</h2>
          <p>The Sample Superstore dataset is a classic retail analytics dataset used to practice business intelligence. It contains order-level data for a fictional US-based office supply and furniture retailer. Each row is a product line within an order, with details on sales, quantity, discount, and profit.</p>
          <p style={{marginTop:'0.75rem'}}>This dashboard answers four key business questions:</p>
          <ol style={{paddingLeft:'1.5rem',lineHeight:2.2,marginTop:'0.5rem'}}>
            <li><strong>Which categories drive the most sales and profit?</strong></li>
            <li><strong>How is sales trending over time?</strong></li>
            <li><strong>Which regions and segments are most valuable?</strong></li>
            <li><strong>Which sub-categories are profitable — and which are not?</strong></li>
          </ol>
        </section>

        <section className="dash-section">
          <h2>Executive Summary</h2>
          <div className="dash-kpi-row">
            {[
              {val:`$${(totalSales/1000).toFixed(0)}k`,label:'Total Sales'},
              {val:`$${(totalProfit/1000).toFixed(0)}k`,label:'Total Profit'},
              {val:`${profitMargin}%`,label:'Overall Margin'},
              {val:`${orders.length}`,label:'Order Lines'},
              {val:'4',label:'Regions'},
              {val:'3',label:'Segments'},
            ].map(k=>(
              <div key={k.label} className="dash-kpi">
                <span className="kpi-val">{k.val}</span>
                <span className="kpi-lbl">{k.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dash-section">
          <h2>Sales by Category</h2>
          <p>The store sells across three main categories. <strong>Technology</strong> drives the most revenue — high-priced items like copiers, phones, and accessories. <strong>Furniture</strong> also generates high sales but at lower profit margins. <strong>Office Supplies</strong> are high-volume but lower-value per item.</p>
          <div className="dash-chart-wrap" style={{maxWidth:480}}>
            <CategoryBarChart/>
          </div>
          <div className="dash-table-wrap" style={{marginTop:'1rem'}}>
            <table className="dash-table">
              <thead><tr><th>Category</th><th>Total Sales</th><th>Total Profit</th><th>Profit Margin</th></tr></thead>
              <tbody>
                {salesByCategory.map(d=>(
                  <tr key={d.cat}>
                    <td><span style={{display:'inline-block',width:10,height:10,borderRadius:2,background:CAT_COLOR(d.cat),marginRight:8}} />{d.cat}</td>
                    <td>${(d.sales).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</td>
                    <td style={{color:d.profit>0?'#27ae60':'#c0392b'}}>${(d.profit).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</td>
                    <td>{(d.profit/d.sales*100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dash-section">
          <h2>Monthly Sales & Profit Trend (2022–2024)</h2>
          <p>Retail sales follow a clear seasonal pattern. Sales peak in <strong>November–December</strong> every year (holiday shopping), dip in January, and build steadily through the year. Profit follows a similar curve, showing the business is scaling without losing margin.</p>
          <div className="dash-chart-wrap">
            <SalesTrendChart/>
          </div>
          <div className="dash-insight">The trend is consistently upward year-over-year. December 2023 reached over $124k in monthly sales — a 10% increase over December 2022. The profit line (dashed green) maintains a consistent margin throughout, indicating no margin erosion from promotions.</div>
        </section>

        <section className="dash-section">
          <h2>Sales Distribution by Region</h2>
          <p>The store operates in four US regions. The <strong>West</strong> is the strongest market — California and Washington generate the highest order volumes and revenue. The <strong>South</strong> has the most opportunity for growth.</p>
          <div className="dash-chart-wrap" style={{maxWidth:420}}>
            <RegionDonut/>
          </div>
          <div className="dash-table-wrap" style={{marginTop:'1rem'}}>
            <table className="dash-table">
              <thead><tr><th>Region</th><th>Sales</th><th>Profit</th><th>Margin</th></tr></thead>
              <tbody>
                {salesByRegion.sort((a,b)=>b.sales-a.sales).map(d=>(
                  <tr key={d.region}>
                    <td><span style={{display:'inline-block',width:10,height:10,borderRadius:2,background:REG_COLOR(d.region),marginRight:8}} />{d.region}</td>
                    <td>${(d.sales).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</td>
                    <td style={{color:d.profit>0?'#27ae60':'#c0392b'}}>${(d.profit).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</td>
                    <td>{(d.profit/d.sales*100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dash-section">
          <h2>Top Sub-Categories by Sales & Profitability</h2>
          <p>Not all sub-categories are created equal. This chart shows sales volume (bar length) alongside profit (label). <strong>Red bars</strong> indicate sub-categories that generate losses — often due to high discounting.</p>
          <div className="dash-chart-wrap" style={{maxWidth:540}}>
            <SubcatChart/>
          </div>
          <div className="dash-insight">Tables and Bookcases can be problematic — large discounts applied during promotions push them into loss territory. Copiers and Phones are the most profitable sub-categories per dollar of revenue. Binders are high volume but thin margin.</div>
        </section>

        <section className="dash-section">
          <h2>Profit by Customer Segment</h2>
          <p>The store serves three segments: individual <strong>Consumers</strong>, <strong>Corporate</strong> clients, and <strong>Home Office</strong> buyers. Corporate clients place larger orders and are more predictable, but Consumer sales are higher in total volume.</p>
          <div className="dash-chart-wrap" style={{maxWidth:440}}>
            <SegmentProfitBar/>
          </div>
          <div className="dash-insight">Home Office buyers have the highest profit margin percentage — they are less price-sensitive and rarely request large discounts. Corporate clients generate the most absolute profit due to order volume. Consumers are the most discount-seeking segment.</div>
        </section>

        <section className="dash-section">
          <h2>Business Recommendations</h2>
          <div className="dash-findings">
            {[
              {n:'1',title:'Reduce discounting on Tables and Bookcases',body:'These two sub-categories are frequently loss-making due to aggressive discounting. Cap discounts at 20% and measure the profit recovery within one quarter.'},
              {n:'2',title:'Expand Technology in the West region',body:'The West already drives the most revenue. Technology margins are the healthiest. Targeted campaigns for copiers and phones in California and Washington have the highest ROI potential.'},
              {n:'3',title:'Build Q4 inventory earlier',body:'November–December drives 25–30% of annual revenue. Supply chain lead times must be planned for October at the latest to avoid stockouts in the peak window.'},
              {n:'4',title:'Invest in the Corporate segment',body:'Corporate clients are growing year-over-year and have consistent order patterns. Dedicated account management and contract pricing can improve loyalty and further reduce churn.'},
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
