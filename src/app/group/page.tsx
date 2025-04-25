import { PaymentItem, SpendItem } from "components/Item"

export default function group() {
	const items = [
		{ name: 'Dinner', owner: 'Leslie', totalAmount: 100.00, date: '2023-01-23T13:23Z', type: 'Spend' },
		{ name: 'Dinner', from: 'Leslie', to: 'Michale', totalAmount: 100.00, date: '2023-01-23T13:23Z', type: 'Payment' },
		{ name: 'Dinner', owner: 'Leslie', totalAmount: 100.00, date: '2023-01-23T13:23Z' },
		{ name: 'Dinner', owner: 'Leslie', totalAmount: 100.00, date: '2023-01-23T13:23Z' },
		{ name: 'Dinner', from: 'Leslie', to: 'Michale', totalAmount: 100.00, date: '2023-01-23T13:23Z', type: 'Payment' },
	]

	return <div>
		<ul role="list" className="divide-y divide-gray-100">
			{
				items.map((e, index) => {
					if (e.type === 'Spend') {
						return <SpendItem key={index} activity={e}></SpendItem>
					}else {
						return <PaymentItem key={index} activity={e}></PaymentItem>
					}
				})
			}
		</ul>
	</div>

}