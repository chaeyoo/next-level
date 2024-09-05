"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type CommentStat = {
	post_id: number;
	title: string;
	comment_count: string;
	unique_commenters: string;
};

type BubbleChartWrapperProps = {
	data: CommentStat[];
};

const BubbleChartWrapper: React.FC<BubbleChartWrapperProps> = ({ data }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (data && svgRef.current) {
			const svg = d3.select(svgRef.current);
			svg.selectAll("*").remove(); // Clear previous chart

			const margin = { top: 20, right: 30, bottom: 40, left: 40 };
			const width = 600 - margin.left - margin.right;
			const height = 400 - margin.top - margin.bottom;

			const x = d3
				.scaleLinear()
				.domain([0, data.length - 1])
				.range([margin.left, width - margin.right]);

			const y = d3
				.scaleLinear()
				.domain([0, d3.max(data, (d) => +d.comment_count) || 0])
				.nice()
				.range([height - margin.bottom, margin.top]);

			const size = d3
				.scaleLinear()
				.domain([0, d3.max(data, (d) => +d.unique_commenters) || 0])
				.range([4, 40]);

			const color = d3.scaleOrdinal(d3.schemeCategory10);

			svg
				.append("g")
				.attr("transform", `translate(0,${height - margin.bottom})`)
				.call(d3.axisBottom(x).ticks(data.length));

			svg
				.append("g")
				.attr("transform", `translate(${margin.left},0)`)
				.call(d3.axisLeft(y));

			svg
				.append("g")
				.selectAll("circle")
				.data(data)
				.join("circle")
				.attr("cx", (d, i) => x(i))
				.attr("cy", (d) => y(+d.comment_count))
				.attr("r", (d) => size(+d.unique_commenters))
				.attr("fill", (d) => color(d.post_id.toString()))
				.attr("opacity", 0.7)
				.append("title")
				.text(
					(d) =>
						`${d.title}\n댓글 수: ${d.comment_count}\n고유 댓글 작성자 수: ${d.unique_commenters}`
				);

			// X축 레이블
			svg
				.append("text")
				.attr(
					"transform",
					`translate(${width / 2},${height + margin.top + 20})`
				)
				.style("text-anchor", "middle")
				.text("게시물");

			// Y축 레이블
			svg
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 0 - margin.left)
				.attr("x", 0 - height / 2)
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("댓글 수");
		}
	}, [data]);

	return <svg ref={svgRef} width={600} height={400} />;
};

export default BubbleChartWrapper;
