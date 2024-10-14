import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

export function UserInfo() {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="link"
						className="px-0 flex gap-4 items-center hover:no-underline"
					>
						<div className="flex flex-col gap-1">
							<p className="font-bold text-end">Usuário</p>
							<span className="text-xs text-muted-foreground text-end">
								Admin
							</span>
						</div>

						<Avatar className="w-12 h-12">
							<AvatarImage src={undefined} />
							<AvatarFallback>US</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent sideOffset={12}>
					<DropdownMenuItem className="justify-between">
						<span>Sair</span>
						<LogOut className="size-4" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
