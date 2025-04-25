'use client'; // If you're using App Router (Next.js 13+)
import { useState } from "react"

export default function Payment() {
    const users = [
        { id: '1', name: 'john' },
        { id: '2', name: 'alexandra' },
        { id: '3', name: 'kevin' },
        { id: '4', name: 'mary' }
    ]
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        amount: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
    };

    return <form onSubmit={undefined}>

        <div>
            <label htmlFor='from'>From</label>
            <select name="from" value={formData.from} onChange={handleChange} required>
                <option value="">Select an User</option>
                {
                    users.map(e => <option key={e.id} value={e.id}>{e.name}</option>)
                }
            </select>
        </div>

        <div>
            <label htmlFor='to'>Owner</label>
            <select name="to" value={formData.to} onChange={handleChange} required>
                <option value="">Select an User</option>
                {
                    users.filter(e=> e.id !== formData.from).map(e => <option key={e.id} value={e.id}>{e.name}</option>)
                }
            </select>
        </div>

        <div>
                <label htmlFor='amount'>Amount</label>
                <input type='number' name='amount' id='amount' required step={0.1} value={formData.amount} onChange={handleChange} />
            </div>
    </form>
}