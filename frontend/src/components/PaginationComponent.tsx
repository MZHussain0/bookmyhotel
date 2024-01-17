import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent = ({
  page,
  pages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious href="#" />
        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#"
              isActive={number === page}
              onClick={() => onPageChange(number)}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationEllipsis />
        <PaginationNext href="#" />
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
