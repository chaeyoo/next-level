"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type CategoryStat = {
	category_id: number;
	category_name: string;
	post_count: string;
	total_views: string;
	total_likes: string;
};

type StackedBarChartWrapperProps = {
	data: CategoryStat[];
};

const StackedBarChartWrapper: React.FC<StackedBarChartWrapperProps> = ({
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

			const series = d3
				.stack<CategoryStat>()
				.keys(["post_count", "total_views", "total_likes"])
				.value((d, key) => +d[key as keyof CategoryStat])(data);

			const x = d3
				.scaleBand()
				.domain(data.map((d) => d.category_name))
				.range([margin.left, width - margin.right])
				.padding(0.1);

			const y = d3
				.scaleLinear()
				.domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1])) || 0])
				.rangeRound([height - margin.bottom, margin.top]);

			const color = d3
				.scaleOrdinal()
				.domain(series.map((d) => d.key))
				.range(["#98abc5", "#8a89a6", "#7b6888"]);

			svg
				.append("g")
				.selectAll("g")
				.data(series)
				.join("g")
				// .attr("fill", (d) => color(d.key))
				.selectAll("rect")
				.data((d) => d)
				.join("rect")
				.attr("x", (d, i) => x(data[i].category_name) || 0)
				.attr("y", (d) => y(d[1]))
				.attr("height", (d) => y(d[0]) - y(d[1]))
				.attr("width", x.bandwidth());

			svg
				.append("g")
				.attr("transform", `translate(0,${height - margin.bottom})`)
				.call(d3.axisBottom(x).tickSizeOuter(0));

			svg
				.append("g")
				.attr("transform", `translate(${margin.left},0)`)
				.call(d3.axisLeft(y));

			// Legend
			const legend = svg
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
				// .attr("fill", color);

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

	return <svg ref={svgRef} width={600} height={400} />;
};

export default StackedBarChartWrapper;
