

interface PaginationProps {
	total: number;
	current: number;
	onChange: (page: number) => void;
}

export default function Pagination({ total, current, onChange }: PaginationProps) {

	const handlePageChange = (pageNumber: number) => {
		onChange(pageNumber);
	};

	return (
		<div className="flex gap-2">
			{Array.from({ length: total }, (_, i) => {
				const pageNumber = i ;
				const isActive = pageNumber === current;
				return (
					<button
						key={i}
						className={`h-[8px] w-[8px] rounded-full shadow transition duration-300 ${
							isActive ? "bg-purple-500" : "bg-white"
						} transform hover:scale-110 hover:shadow-lg`}
						onClick={() => handlePageChange(pageNumber)}
					/>
				);
			})}
		</div>
	);
}
