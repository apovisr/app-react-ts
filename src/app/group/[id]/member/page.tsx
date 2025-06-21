import AddMemberGroup from "components/add-member";
import { GroupMemberDto, UserDto } from "dto/all.dto";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const groupMemberIds: number[] = await fetch(`http://127.0.0.1:3001/api/group-members/group/${id}`).then((res) => res.json()).then((res) => res.map((e: GroupMemberDto) => e.userId))

    const users: UserDto[] = await fetch(`http://127.0.0.1:3001/api/users`).then((res) => res.json()).then((res) => res.filter((e: UserDto) => !groupMemberIds.includes(e.id)))

    return <AddMemberGroup users={users} id={id}></AddMemberGroup>
}