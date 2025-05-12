import Payment from "components/payment";
import { GroupMemberDto } from "dto/all.dto";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

    const users: GroupMemberDto[] = await fetch(`http://127.0.0.1:3001/groupMembers/group/${id}`).then((res) => res.json())


    return <Payment users={users} groupId={id}></Payment>
}