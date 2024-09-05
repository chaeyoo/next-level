"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type PostStat = {
	post_id: number;
	title: string;
	view_count: string;
	like_count: string;
};

type GroupedBarChartWrapperProps = {
	data: PostStat[];
};

const GroupedBarChartWrapper: React.FC<GroupedBarChartWrapperProps> = ({
	data,
}) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (data && svgRef.current) {
			const svg = d3.select(svgRef.current);
			svg.selectAll("*").remove(); // Clear previous chart

			const margin = { top: 20, right: 30, bottom: 40, left: 40 };
			const width = 600 - margin.left - margin.right;
			const height = 400 - margin.top - margin.bottom;

			const x0 = d3
				.scaleBand()
				.domain(data.map((d) => d.title))
				.rangeRound([0, width])
				.paddingInner(0.1);

			const x1 = d3
				.scaleBand()
				.domain(["view_count", "like_count"])
				.rangeRound([0, x0.bandwidth()])
				.padding(0.05);

			const y = d3
				.scaleLinear()
				.domain([
					0,
					d3.max(data, (d) => Math.max(+d.view_count, +d.like_count)) || 0,
				])
				.nice()
				.rangeRound([height, 0]);

			const color = d3
				.scaleOrdinal()
				.domain(["view_count", "like_count"])
				.range(["#4e79a7", "#f28e2c"]);

			const g = svg
				.append("g")
				.attr("transform", `translate(${margin.left},${margin.top})`);

			g.append("g")
				.selectAll("g")
				.data(data)
				.join("g")
				.attr("transform", (d) => `translate(${x0(d.title)},0)`)
				.selectAll("rect")
				.data((d) =>
					["view_count", "like_count"].map((key) => ({
						key,
						value: +d[key as keyof PostStat],
					}))
				)
				.join("rect")
				.attr("x", (d) => x1(d.key) || 0)
				.attr("y", (d) => y(d.value))
				.attr("width", x1.bandwidth())
				.attr("height", (d) => height - y(d.value))
				// .attr("fill", (d) => color(d.key));

			g.append("g")
				.attr("transform", `translate(0,${height})`)
				.call(d3.axisBottom(x0));

			g.append("g").call(d3.axisLeft(y).ticks(null, "s"));

			// Legend
			const legend = g
				.append("g")
				.attr("font-family", "sans-serif")
				.attr("font-size", 10)
				.attr("text-anchor", "end")
				.selectAll("g")
				.data(["view_count", "like_count"].slice().reverse())
				.join("g")
				.attr("transform", (d, i) => `translate(0,${i * 20})`);

			legend
				.append("rect")
				.attr("x", width - 19)
				.attr("width", 19)
				.attr("height", 19)
				// .attr("fill", color);

			legend
				.append("text")
				.attr("x", width - 24)
				.attr("y", 9.5)
				.attr("dy", "0.32em")
				.text((d) => (d === "view_count" ? "조회수" : "좋아요 수"));
		}
	}, [data]);

	return <svg ref={svgRef} width={600} height={400} />;
};

export default GroupedBarChartWrapper;
