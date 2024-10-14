import { cn } from "@/lib/utils"

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select"

interface ITablePaginationProps {
	total: number
	pageSize: number
	currentPage: number
	setCurrentPage: (_page: number) => void
	setPageSize: (_page: number) => void
}

export function TablePagination({
	total,
	pageSize,
	currentPage,
	setCurrentPage,
	setPageSize,
}: ITablePaginationProps) {
	const pageNumbers = []
	for (let i = 0; i < Math.ceil(total / pageSize); i++) {
		pageNumbers.push(i)
	}

	const maxPageNum = 5
	const pageNumLimit = Math.floor(maxPageNum / 2)

	const activePages = pageNumbers.slice(
		Math.max(0, currentPage - pageNumLimit),
		Math.min(currentPage + pageNumLimit + 1, pageNumbers.length),
	)

	const handleNextPage = () => {
		if (currentPage < pageNumbers.length - 1) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handlePrevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1)
		}
	}

	const renderPages = () => {
		const renderedPages = activePages.map(page => (
			<PaginationItem
				key={page}
				className={cn({
					"bg-brand-primary-500 text-white rounded-md pointer-events-none":
						currentPage === page,
				})}
			>
				<PaginationLink onClick={() => setCurrentPage(page)}>
					{page + 1}
				</PaginationLink>
			</PaginationItem>
		))

		if (activePages[0] > 0) {
			renderedPages.unshift(
				<PaginationEllipsis
					key="ellipsis-start"
					onClick={() => setCurrentPage(activePages[0] - 1)}
				/>,
			)
		}

		if (activePages[activePages.length - 1] < pageNumbers.length - 1) {
			renderedPages.push(
				<PaginationEllipsis
					key="ellipsis-end"
					onClick={() =>
						setCurrentPage(activePages[activePages.length - 1] + 1)
					}
				/>,
			)
		}

		return renderedPages
	}

	return (
		<div className="w-full flex gap-4 items-center justify-end">
			<Pagination>
				<PaginationContent>
					{currentPage > 0 && (
						<PaginationItem>
							<PaginationPrevious onClick={handlePrevPage} />
						</PaginationItem>
					)}

					{renderPages()}

					{currentPage < pageNumbers.length - 1 && (
						<PaginationItem>
							<PaginationNext onClick={handleNextPage} />
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>

			<Select
				value={String(pageSize)}
				onValueChange={value => setPageSize(Number(value))}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="10">10 itens por página</SelectItem>
					<SelectItem value="20">20 itens por página</SelectItem>
					<SelectItem value="50">50 itens por página</SelectItem>
					<SelectItem value="100">100 itens por página</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
