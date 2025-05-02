import { PaymentItem, SpendItem } from "components/Item"
import { ExpenseDto, SettlementDto } from "dto/all.dto"
import Link from "next/link"

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const expenses : ExpenseDto[]= await fetch(`http://127.0.0.1:3001/expenses/group/${id}`).then((res) => res.json())
	const settlements : SettlementDto[]= await fetch(`http://127.0.0.1:3001/settlements/group/${id}`).then((res) => res.json())
	return <div>
		<Link href={`${id}/payment`}><button>crear payment</button></Link>
		<ul role="list" className="divide-y divide-gray-100">
			{
				expenses.map((e, index) => {
						return <SpendItem key={index} activity={e}></SpendItem>
				})
			}
		</ul>
		<ul role="list" className="divide-y divide-gray-100">
			{
				settlements.map((e, index) => {
						return <PaymentItem key={index} activity={e}></PaymentItem>
					})
			}
		</ul>
	</div>
}
