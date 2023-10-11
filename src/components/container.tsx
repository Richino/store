
interface Props {
	children: React.ReactNode;
}

export default function Container({ children }: Props) {
	return <div className={`sm:w-[1000px] sm:max-w-[1000px] flex flex-col gap-5 w-full `}>{children}</div>;
}
