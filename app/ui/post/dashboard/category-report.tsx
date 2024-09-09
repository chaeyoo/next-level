"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { CategoryStat } from "@/app/lib/posts/dashboard/definitions";
import { lusitana } from "../../fonts";

type StackedBarChartWrapperProps = {
	data: CategoryStat[];
};

const StackedBarChartWrapper: React.FC<StackedBarChartWrapperProps> = ({
	data,
}) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (data && svgRef.current && containerRef.current) {
			const svg = d3.select(svgRef.current);
			svg.selectAll("*").remove();

			const containerWidth = containerRef.current.clientWidth;
			const containerHeight = containerRef.current.clientHeight;

			const margin = { top: 40, right: 40, bottom: 60, left: 60 };
			const width = containerWidth - margin.left - margin.right;
			const height = containerHeight - margin.top - margin.bottom;

			const series = d3
				.stack<CategoryStat>()
				.keys(["post_count", "total_views", "total_likes"])
				.value((d, key) => +d[key as keyof CategoryStat])(data);

			const x = d3
				.scaleBand()
				.domain(data.map((d) => d.category_name))
				.range([0, width])
				.padding(0.1);

			const y = d3
				.scaleLinear()
				.domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1])) || 0])
				.nice()
				.rangeRound([height, 0]);

			const color = d3
				.scaleOrdinal<string>()
				.domain(series.map((d) => d.key))
				.range(["#98abc5", "#8a89a6", "#7b6888"]);

			const g = svg
				.append("g")
				.attr("transform", `translate(${margin.left},${margin.top})`);

			g.append("g")
				.selectAll("g")
				.data(series)
				.join("g")
				.attr("fill", (d) => color(d.key))
				.selectAll("rect")
				.data((d) => d)
				.join("rect")
				.attr("x", (d, i) => x(data[i].category_name) || 0)
				.attr("y", (d) => y(d[1]))
				.attr("height", (d) => y(d[0]) - y(d[1]))
				.attr("width", x.bandwidth());

			g.append("g")
				.attr("transform", `translate(0,${height})`)
				.call(d3.axisBottom(x))
				.selectAll("text")
				.attr("y", 10)
				.attr("x", -5)
				.attr("dy", ".35em")
				.attr("transform", "rotate(-45)")
				.style("text-anchor", "end");

			g.append("g").call(d3.axisLeft(y).ticks(null, "s"));

			// Legend
			const legend = g
				.append("g")
				.attr("font-family", "sans-serif")
				.attr("font-size", 10)
				.attr("text-anchor", "end")
				.selectAll("g")
				.data(["post_count", "total_views", "total_likes"].slice().reverse())
				.join("g")
				.attr("transform", (d, i) => `translate(0,${i * 20})`);

			legend
				.append("rect")
				.attr("x", width - 19)
				.attr("width", 19)
				.attr("height", 19)
				.attr("fill", (d) => color(d));

			legend
				.append("text")
				.attr("x", width - 24)
				.attr("y", 9.5)
				.attr("dy", "0.32em")
				.text((d) =>
					d === "post_count"
						? "게시물 수"
						: d === "total_views"
						? "총 조회수"
						: "총 좋아요 수"
				);
		}
	}, [data]);

	return (
		<div className="min-w-80 h-[400px] rounded-xl p-4 flex items-center justify-center">
			<div ref={containerRef} className="w-full h-full">
			<div className={`${lusitana.className} mb-4 text-xl md:text-2xl font-semibold`}>
				카테고리별 통계
			</div>
				<svg className="bg-gray-50" ref={svgRef} width="100%" height="100%" />
			</div>
		</div>
	);
};

export default StackedBarChartWrapper;
