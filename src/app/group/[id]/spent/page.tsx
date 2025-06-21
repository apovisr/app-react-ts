import Spent from "components/spent";
import { GroupMemberDto } from "dto/all.dto";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const users: GroupMemberDto[] = await fetch(`http://127.0.0.1:3001/api/group-members/group/${id}`).then((res) => res.json())

    return <Spent users={users} groupId={id}></Spent>
}