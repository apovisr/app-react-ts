export function SpendItem({activity}){
return  (
        <li className="flex justify-center gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">{activity.name}</p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">{activity.owner}</p>
            </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">S/. {activity.totalAmount}</p>
            <p className="mt-1 text-xs/5 text-gray-500"><time dateTime={activity.date}>3h ago</time></p>
        </div>
    </li>)
};

export function PaymentItem({activity}){
    return  (
            <li className="flex justify-center gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{activity.name}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">From {activity.from} to {activity.to}</p>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">S/. {activity.totalAmount}</p>
                <p className="mt-1 text-xs/5 text-gray-500"><time dateTime={activity.date}>3h ago</time></p>
            </div>
        </li>)
    };