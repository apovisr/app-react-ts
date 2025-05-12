'use client'; // If you're using App Router (Next.js 13+)
import { GroupMemberDto } from "dto/all.dto";
import { redirect } from "next/navigation";
import { useState } from "react"

export default function Spent({ users, groupId }: { users: GroupMemberDto[], groupId: string }) {
    const map = new Map<string, Type>([
        ["percentage", new PercentageType()],
        ["manual", new ManualType()],
        ["equals", new EqualsType()]
    ])

    const [formData, setFormData] = useState({
        name: '',
        totalAmount: 0,
        groupId: groupId,
        type: 'equals',
        groupMemberId: undefined,
        currentParticipant: undefined,
        expenseSplits: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('participants')) {
            // Handle contact changes (update a specific contact in the array)
            const [field, index, subField] = name.split('.');
            const updatedParticipants = [...formData.expenseSplits];
            updatedParticipants[index][subField] = value;
            const updatedParticipantsChanged = map.get(formData.type).split(formData.totalAmount, updatedParticipants)
            setFormData({
                ...formData,
                expenseSplits: updatedParticipantsChanged
            });
        } else if (name.startsWith('type')) {
            const updatedParticipantsChanged = map.get(value).split(formData.totalAmount, formData.expenseSplits)
            setFormData(prev => ({ ...prev, [name]: value, participants: updatedParticipantsChanged }));
        } else if (name.startsWith('totalAmount')) {
            const updatedParticipantsChanged = map.get(formData.type).split(value, formData.expenseSplits)
            setFormData(prev => ({ ...prev, [name]: value, participants: updatedParticipantsChanged }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }


    };

    const handleChangeOwner = (e) => {
        const { name, value } = e.target;
        const updatedParticipants = map.get(formData.type).split(formData.totalAmount, [{ groupMemberId: value, amount: 0, percentage: 100 }])

        setFormData(prev => ({
            ...prev, [name]: value,
            expenseSplits: updatedParticipants
        }));
    };

    const addParticipant = () => {
        if (formData.currentParticipant) {
            const updatedParticipants = map.get(formData.type).split(formData.totalAmount, [...formData.expenseSplits, { groupMemberId: formData.currentParticipant, amount: 0 }])
            setFormData({
                ...formData,
                expenseSplits: updatedParticipants,
                currentParticipant: ''
            })
        }
    };

    const removeParticipant = (id) => {
        setFormData({
            ...formData,
            expenseSplits: formData.expenseSplits.filter(e => e !== id)
        })
    };

    async function onSubmit(event:  React.FormEvent) {
        event.preventDefault()

        try {
            await fetch('/api/expenses', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(formData)
            // ...
        } catch (error) {
            // Capture the error message to display to the user
            console.error(error)
        } finally {

        }
        redirect(`/group/${groupId}`)
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name' required value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='totalAmount'>Total Amount</label>
                <input type='number' name='totalAmount' id='totalAmount' required step={0.1} value={formData.totalAmount} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor='groupMemberId'>Owner</label>
                <select name="groupMemberId" value={formData.groupMemberId} onChange={handleChangeOwner} required>
                    <option value="">Select an Owner</option>
                    {
                        users.map(e => <option key={e.id} value={e.id}>{e.name}</option>)
                    }
                </select>
            </div>

            <div>
                <label htmlFor='currentParticipant'>Participants</label>
                <select name="currentParticipant" value={formData.currentParticipant} onChange={handleChange} required>
                    <option value=''>Select a Participant</option>
                    {
                        users.filter(e => e.id !== formData.groupMemberId)
                            .filter(e => !formData.expenseSplits.map(e => e.id).includes(e.id))
                            .map(e => <option key={e.id} value={e.id}>{e.name}</option>)
                    }
                </select>
                <button onClick={addParticipant} className="bg-blue-500 text-white px-4 py-2 rounded"> Add Participant</button>
            </div>

            <div>
                <p>Type</p>
                <div>
                    <h2>Select an option:</h2>
                    <label>
                        <input
                            type="radio"
                            value="percentage"
                            name="type"
                            checked={formData.type === 'percentage'}
                            onChange={handleChange}
                        />
                        Percentage
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            value="manual"
                            name="type"
                            checked={formData.type === 'manual'}
                            onChange={handleChange}
                        />
                        manual
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            value="equals"
                            name="type"
                            checked={formData.type === 'equals'}
                            onChange={handleChange}
                        />
                        equals
                    </label>
                </div>
            </div>

            <div>
                {
                    formData.expenseSplits.map((e, index) =>
                        users.filter(user => user.id == e.groupMemberId).map(user => {
                            const nameAmount = 'participants.' + index + '.amount';
                            const namePercentage = 'participants.' + index + '.percentage';
                            return <div key={user.id}>
                                <label htmlFor={nameAmount} >{user.name}</label>
                                <input name={nameAmount} type="number" value={e.amount} onChange={handleChange}></input>
                                <label htmlFor={namePercentage} >percentage</label>
                                <input name={namePercentage} type="number" value={e.percentage} onChange={handleChange}></input>
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => removeParticipant(user.id)}>Remove</button>
                            </div>
                        })
                    )
                }
            </div>

            <button name='submit' type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" >Enviar</button>
        </form>
    )
}


interface Type {
    split(totalAmount: number, participants: Array<any>)
}

class PercentageType implements Type {
    split(totalAmount: number, participants: Array<any>) {
        participants.forEach(e => {
            e.amount = ((totalAmount * e.percentage) / 100).toFixed(2);
        })
        return participants;
    }
}

class ManualType implements Type {
    split(totalAmount: number, participants: Array<any>) {
        return participants;
    }
}

class EqualsType implements Type {
    split(totalAmount: number, participants: Array<any>): Array<any> {
        const equalsAmount = (totalAmount / participants.length).toFixed(2)
        const equalsPercentage = (100 / participants.length).toFixed(2)
        participants.forEach(e => {
            e.amount = equalsAmount;
            e.percentage = equalsPercentage
        })
        return participants;
    }
}

