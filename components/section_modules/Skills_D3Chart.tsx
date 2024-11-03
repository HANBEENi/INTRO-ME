/**
 * 스킬 섹션에 사용되는 D3.js 원형 그래프 컴포넌트 입니다.
 *
 * data 예시
 * [{ category: "CSS", value: 80, color: "#35d0e1" },];
 */

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface DataItem {
  category: string;
  value: number;
  color: string;
  startAngle?: number;
  endAngle?: number;
}

interface D3ChartProps {
  data: DataItem[];
  chartId: string;
  isAnimate: boolean;
}

const Skills_D3Chart = ({ data, chartId, isAnimate }: D3ChartProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  // console.log('isAnimate',isAnimate);

  useEffect(() => {
    // if (!chartRef.current || !isAnimate) return; //animate가 true일 때만 애니메이션 실행
    if (!chartRef.current) return;

    // 기존의 SVG 요소를 제거
    d3.select(`#${chartId}`).select("svg").remove();

    // 막대 반경
    const innerRadius = 30;

    // svg 너비,높이 단위
    const unit = 350;

    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("viewBox", `0 0 ${unit} ${unit}`)
      .attr("preserveAspectRatio", "xMidYMid meet") // 뷰포트 중앙에 svg 맞추기, 뷰박스 종횡비 유지
      .style("width", "100%")
      .style("height", "auto")
      .style("min-width", "30px")
      .style("max-width", "700px")
      .append("g")
      .attr("transform", `translate(${unit / 2}, ${unit / 2})`);

    // arc 생성
    const arc = d3
      .arc<any>()
      .innerRadius((d: any, i: number) => innerRadius + i * 20 + 8) //그래프 내반경 설정
      .outerRadius((d: any, i: number) => innerRadius + i * 20 + 25) //그래프 외반경 설정
      .startAngle(0) // 막대 시작 각도 설정
      .cornerRadius(10) // 막대 끝을 둥글게 설정
      .padAngle(0.01)
      .padRadius(innerRadius);

    // 중앙 텍스트 ('value%')
    const centerText = svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-size", "1.375rem")
      .style("opacity", 0);

    // 하단 텍스트 (value%에 따른 스택 능력치 설명 텍스트)
    const bottomText = svg
      .append("text")
      .attr("class", "tooltip-text")
      .attr("x", 0)
      .attr("y", unit / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "1rem")
      .style("opacity", 0);

    /** 먼저 각 데이터 별 그래프를 추가(그래프를 먼저 만들어줘야, 텍스트가 그래프에 안가려짐) */
    data.forEach((d, i) => {
      const grape = svg
        .append("path")
        .datum(d) // 데이터 바인딩
        .attr("fill", d.color)
        .each(function () {
          (this as any)._current = { startAngle: 0, endAngle: 0 };
        })
        /** 마우스오버 이벤트 */
        .on("mouseover", function () {
          //모든 막대 opacity 0.3로 설정
          svg.selectAll("path").style("opacity", 0.2);
          // 모든 카테고리의 opacity 0.3로 설정
          svg
            .selectAll("text.category-label")
            .style("opacity", 0.2)
            .style("font-size", "1rem");

          // 현재 막대의 opacity 1로 설정
          d3.select(this as any)
            .style("opacity", 1)
            .transition()
            .duration(200);
          // 툴팁 블럭 보이게 설정
          d3.select(`#tooltip-${i}`)
            .transition()
            .duration(300)
            .style("display", "block");
          // 현재 카테고리-라벨의 opacity 1로 설정
          svg
            .selectAll(`text.category-label`)
            .filter((datum, index) => index === i)
            .style("opacity", 1)
            .style("font-size", "1.5625rem");

          // 중앙텍스트('value%')
          centerText
            .transition()
            .duration(400)
            .style("opacity", 1)
            .style("fill", `${d.color}`)
            .tween("text", function () {
              const interpolator = d3.interpolate(0, d.value);
              return function (t) {
                d3.select(this).text(`${Math.round(interpolator(t))}%`);
              };
            });
          // 하단텍스트
          bottomText
            .transition()
            .duration(400)
            .style("opacity", 1)
            .style("fill", `${d.color}`)
            .text(`해당 기술스택 수치에 대한 설명 기재`);
        })
        .on("mouseout", function () {
          svg.selectAll("path").style("opacity", 1);
          svg
            .selectAll("text.category-label")
            .style("opacity", 1)
            .style("font-size", "1rem");

          d3.select(this as any)
            .transition()
            .duration(200);
          d3.select(`#tooltip-${i}`)
            .transition()
            .duration(300)
            .style("display", "none");
          centerText.transition().duration(300).style("opacity", 0);
          bottomText.transition().duration(300).style("opacity", 0);
        });

      /** 그래프 애니메이션 */
      grape
        .transition()
        .duration(1000)
        .ease(d3.easeCubic) //애니메이션을 부드럽게 (easeSin, easeElastic)
        .attrTween("d", function (d: any) {
          const interpolate = d3.interpolate((this as any)._current, {
            startAngle: 0,
            endAngle: (d.value / 118) * 2 * Math.PI,
          });
          return (t: number) => {
            (this as any)._current = interpolate(t);
            return arc((this as any)._current, i) as string;
          };
        });
    });

    // 점선 생성
    const line = svg
      .append("line")
      .attr("stroke", "#000000")
      .attr("stroke-dasharray", "2")
      .attr("strokeWidth", "2")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .style("opacity", 0)
      .style("pointer-events", "none");
    // 점선 마우스 이벤트
    svg.on("mousemove", (event) => {
      const [mouseX, mouseY] = d3.pointer(event);
      const angle = Math.atan2(mouseY, mouseX);
      const maxDotLineRadius = innerRadius + data.length * 20 + 25; // 점선 최대 직경
      const endX = maxDotLineRadius * Math.cos(angle);
      const endY = maxDotLineRadius * Math.sin(angle);

      line.attr("x2", endX).attr("y2", endY).style("opacity", 1);
    });
    svg.on("mouseout", () => {
      line.style("opacity", 0);
    });

    /** 카테고리 라벨 추가 */
    const categoryLabels = (
      data: DataItem[],
      svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
      innerRadius: number
    ) => {
      const category = svg
        .selectAll("text.category-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "category-label")
        .attr("x", -15)
        .attr(
          "y",
          (d, i) => (innerRadius + i * 20 + 18) * Math.sin(-Math.PI / 2)
        )
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .style("fill", (d) => d.color)
        .style("font-weight", "bold")
        .style("font-size", "1rem")
        .text((d) => `${d.category}`)
        .on("mouseover", function (event, datum) {
          // 라벨에 대응하는 막대 찾기
          const index = data.indexOf(datum);
          svg.selectAll("path").style("opacity", 0.2);
          svg
            .selectAll("text.category-label")
            .style("opacity", 0.2)
            .style("font-size", "1rem");

          d3.select(svg.selectAll("path").nodes()[index])
            .style("opacity", 1)
            .transition()
            .duration(200);
          svg
            .selectAll(`text.category-label`)
            .filter((_, i) => i === index)
            .style("opacity", 1)
            .style("font-size", "1.5625rem");
          centerText
            .transition()
            .duration(400)
            .style("opacity", 1)
            .style("fill", `${datum.color}`)
            .tween("text", function () {
              const interpolator = d3.interpolate(0, datum.value);
              return function (t) {
                d3.select(this).text(`${Math.round(interpolator(t))}%`);
              };
            });
          bottomText
            .transition()
            .duration(400)
            .style("opacity", 1)
            .style("fill", `${datum.color}`)
            .text(`커스텀문장`);
        })
        .on("mouseout", function () {
          svg.selectAll("path").style("opacity", 1);
          svg
            .selectAll("text.category-label")
            .style("opacity", 1)
            .style("font-size", "1rem");
          centerText.transition().duration(300).style("opacity", 0);
          bottomText.transition().duration(300).style("opacity", 0);
        });

      category.each(function (d) {
        d3.select(this)
          .append("tspan")
          .attr("class", "value-label")
          .attr("dx", 10)
          .attr("dy", 6)
          .style("fill", "#fff")
          .style("font-weight", "normal")
          .style("font-size", "0.75rem")
          .style("opacity", 0.5)
          .text(`${d.value}%`);
      });
    };
    categoryLabels(
      data,
      svg as unknown as d3.Selection<
        SVGGElement,
        unknown,
        HTMLElement,
        undefined
      >,
      innerRadius
    );
  }, [isAnimate]);

  return (
    <div
      id={chartId}
      ref={chartRef}
      style={{
        width: "100%",
        height: "auto",
        minWidth: "30px",
        maxWidth: "700px",
      }}
    ></div>
  );
};

export default Skills_D3Chart;
