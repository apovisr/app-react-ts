'use client'; // If you're using App Router (Next.js 13+)
import { useState } from "react"

export default function Spent() {
    const map = new Map<string, Type>([
        ["percentage", new PercentageType()],
        ["manual", new ManualType()],
        ["equals", new EqualsType()]
    ])

    const users = [
        { id: '1', name: 'john' },
        { id: '2', name: 'alexandra' },
        { id: '3', name: 'kevin' },
        { id: '4', name: 'mary' }
    ]
    const [formData, setFormData] = useState({
        name: '',
        totalAmount: 0,
        type: 'equals',
        owner: undefined,
        currentParticipant: '',
        participants: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('participants')) {
            // Handle contact changes (update a specific contact in the array)
            const [field, index, subField] = name.split('.');
            const updatedParticipants = [...formData.participants];
            updatedParticipants[index][subField] = value;
            const updatedParticipantsChanged = map.get(formData.type).split(formData.totalAmount, updatedParticipants)
            setFormData({
                ...formData,
                participants: updatedParticipantsChanged
            });
        } else if (name.startsWith('type')) {
            const updatedParticipantsChanged = map.get(value).split(formData.totalAmount, formData.participants)
            setFormData(prev => ({ ...prev, [name]: value, participants: updatedParticipantsChanged }));
        } else if (name.startsWith('totalAmount')) {
            const updatedParticipantsChanged = map.get(formData.type).split(value, formData.participants)
            setFormData(prev => ({ ...prev, [name]: value, participants: updatedParticipantsChanged }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }


    };

    const handleChangeOwner = (e) => {
        const { name, value } = e.target;
        const updatedParticipants = map.get(formData.type).split(formData.totalAmount, [{ id: value, amount: 0, percentage: 100 }])

        setFormData(prev => ({
            ...prev, [name]: value,
            participants: updatedParticipants
        }));
    };

    const addParticipant = () => {
        if (formData.currentParticipant) {
            const updatedParticipants = map.get(formData.type).split(formData.totalAmount, [...formData.participants, { id: formData.currentParticipant, amount: 0 }])
            setFormData({
                ...formData,
                participants: updatedParticipants,
                currentParticipant: ''
            })
        }
    };

    const removeParticipant = (id) => {
        setFormData({
            ...formData,
            participants: formData.participants.filter(e => e !== id)
        })
    };



    return (
        <form onSubmit={undefined}>
            <div>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name' required value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor='totalAmount'>Total Amount</label>
                <input type='number' name='totalAmount' id='totalAmount' required step={0.1} value={formData.totalAmount} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor='owner'>Owner</label>
                <select name="owner" value={formData.owner} onChange={handleChangeOwner} required>
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
                        users.filter(e => e.id !== formData.owner)
                            .filter(e => !formData.participants.map(e => e.id).includes(e.id))
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
                    formData.participants.map((e, index) =>
                        users.filter(user => user.id === e.id).map(user => {
                            const nameAmount = 'participants.' + index + '.amount';
                            const namePercentage = 'participants.' + index + '.percentage';
                            return <div key={user.id}>
                                <label htmlFor={nameAmount} >{user.name}</label>
                                <input name={nameAmount} type="number" value={e.amount} onChange={handleChange} disabled></input>
                                <label htmlFor={namePercentage} >percentage</label>
                                <input name={namePercentage} type="number" value={e.percentage} onChange={handleChange} disabled></input>
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => removeParticipant(user.id)}>Remove</button>
                            </div>
                        })
                    )
                }
            </div>

            <button name='submit' type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" > Add Participant</button>

            <p>name: {formData.name}</p>
            <p>totalAmount: {formData.totalAmount}</p>
            <p>Owner: {formData.owner}</p>
            <label>{formData.type}</label>
            {formData.participants.map(e =>
                <div key={e.id}>
                    <p>id: {e.id}</p>
                    <p>total: {e.amount}</p>
                </div>

            )}
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

