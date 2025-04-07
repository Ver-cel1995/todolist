type TitleButton = 'All' | "Completed" | 'Active' | '+'

type Props = {
    title: TitleButton
}

export const Button = ({ title }: Props) => {
    return <button>{title}</button>
}