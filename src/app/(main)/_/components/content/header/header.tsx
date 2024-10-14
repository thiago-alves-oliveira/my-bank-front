import { Navigation } from "./navigation"
import { UserInfo } from "./user-info/user-info"

export function Header() {
	return (
		<header className="p-6 w-full flex gap-4 items-center justify-between">
			<Navigation />

			<UserInfo />
		</header>
	)
}
