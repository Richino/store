interface Props {
	children: React.ReactNode;
}
export default function CardContainer({ children }: Props) {
	return <div className="flex gap-4 overflow-y-hidden  overflow-x-auto justify-between sm:px-0 px-5 py-5 sm:py-0   sm:grid sm:grid-cols-5 sm:gap-4 sm:overflow-visible">{children}</div>;
}
