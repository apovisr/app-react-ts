'use client'
import { GroupMemberDto } from "dto/all.dto";
import { FormEvent, useState } from "react";

export default function Payment({ users }: { users: GroupMemberDto[] }) {

    const [formData, setFormData] = useState({
        name: '',
        fromGroupMemberId: 0,
        toGroupMemberId: 0,
        amount: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

    };


    async function onSubmit(event:  React.FormEvent) {
        event.preventDefault()

        try {
            await fetch('http://localhost:3001/settlements', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // ...
        } catch (error) {
            // Capture the error message to display to the user
            console.error(error)
        } finally {
        }
    }

    return <form onSubmit={onSubmit}>

        <div>
            <label htmlFor='name'>Name</label>
            <input type='string' name='name' id='name' required value={formData.name} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor='fromGroupMemberId'>From</label>
            <select name="fromGroupMemberId" value={formData.fromGroupMemberId} onChange={handleChange} required>
                <option value="0">Select an User</option>
                {
                    users.map(e => <option key={e.id} value={e.id}>{e.name}</option>)
                }
            </select>
        </div>

        <div>
            <label htmlFor='toGroupMemberId'>Owner</label>
            <select name="toGroupMemberId" value={formData.toGroupMemberId} onChange={handleChange} required>
                <option value="0">Select an User</option>
                {
                    users.filter(e => e.id != formData.fromGroupMemberId).map(e => <option key={e.id} value={e.id}>{e.name}</option>)
                }
            </select>
        </div>

        <div>
            <label htmlFor='amount'>Amount</label>
            <input type='number' name='amount' id='amount' required step={0.1} value={formData.amount} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
    </form>
}