const links = [
    {
        label: '',
        route: ''
    }
]

export default function Sidebar() {
    return (
        <div className="px-6 py-4">
            asd

            <ul>
                {links.map((link, index) => (
                    <li key={index}>

                    </li>
                ))}
            </ul>
        </div>
    )
}