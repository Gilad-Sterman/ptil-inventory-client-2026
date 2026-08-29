import { useState } from "react"
import { BEGGED, STRING, TYING, COLOR, isTalitGadol, getConfirmationMsg } from "../services/info.service"


export function HomeConfirmMsg({ title, setShowConfirmMsg, productMap, submit, loggedUser, type, moreInfo, myOther }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    let begged = ''
    const amount = productMap.amount
    const size = productMap.size
    let string = ''
    let tying = ''
    let otherName = ''
    let color = ''
    
    if (type === 'tiedBegged') {
        begged = BEGGED.find(b => b.code === productMap.begged)?.heb || 'Unknown'
        string = STRING.find(s => s.code === productMap.string)?.heb || 'Unknown'
        tying = TYING.find(t => t.code === productMap.tying)?.heb || 'Unknown'
        if (isTalitGadol(productMap.begged) && productMap.color) {
            color = COLOR.find(c => c.code === productMap.color)?.heb || ''
        }
    } else if (type === 'begged') {
        begged = BEGGED.find(b => b.code === productMap.begged)?.heb || 'Unknown'
        if (isTalitGadol(productMap.begged) && productMap.color) {
            color = COLOR.find(c => c.code === productMap.color)?.heb || ''
        }
    } else if (type === 'string') {
        string = STRING.find(s => s.code === productMap.string)?.heb || 'Unknown'
    } else {
        otherName = myOther.find(n => n.code === productMap.other)?.heb || 'Unknown'
    }

    let content = getConfirmationMsg(type, (otherName ? otherName : begged), size, string, tying, amount, moreInfo, color)

    async function handleSubmit() {
        if (isSubmitting) return
        
        setIsSubmitting(true)
        try {
            await submit(productMap, loggedUser, amount)
        } catch (err) {
            console.error('Submission failed:', err)
            setIsSubmitting(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={() => setShowConfirmMsg(false)}>
            <section className="confirm-msg" onClick={(e) => e.stopPropagation()}>
                <div className="confirm-header">
                    <h4>{title}</h4>
                    <button 
                        className="btn-close-x" 
                        onClick={() => setShowConfirmMsg(false)}
                        aria-label="סגור"
                    >
                        ×
                    </button>
                </div>
                <div className="confirm-content">
                    <pre>{content}</pre>
                </div>
                <div className="confirm-actions">
                    <button 
                        className="btn-cancel" 
                        onClick={() => setShowConfirmMsg(false)}
                        disabled={isSubmitting}
                    >
                        ביטול
                    </button>
                    <button 
                        className="btn-confirm" 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span>
                                מעבד...
                            </>
                        ) : (
                            'אישור'
                        )}
                    </button>
                </div>
            </section>
        </div>
    )
}