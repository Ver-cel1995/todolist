type TitleButton = 'All' | "Completed" | 'Active' | '+' | 'x'

type Props = {
    title: TitleButton
    onClick?: () => void
    className?: string
}

export const Button = ({ title, onClick, className }: Props) => {
    return <button onClick={onClick} className={className}>{title}</button>
}