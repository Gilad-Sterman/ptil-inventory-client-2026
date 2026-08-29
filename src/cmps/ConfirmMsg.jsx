import { dyingService } from "../services/dying.service"
import { shziraService } from "../services/shzira.service"

export function ConfirmMsg({ title, setShowConfirmMsg, page, productMap, submit, loggedUser, amount }) {
    let content
    if (page === 'shzira') content = shziraService.getConfirmationMsg(productMap)
    if (page === 'dying') content = dyingService.getConfirmationMsg(productMap)

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
                    <button className="btn-cancel" onClick={() => setShowConfirmMsg(false)}>
                        ביטול
                    </button>
                    <button className="btn-confirm" onClick={() => submit(productMap, loggedUser, amount)}>
                        אישור
                    </button>
                </div>
            </section>
        </div>
    )
}