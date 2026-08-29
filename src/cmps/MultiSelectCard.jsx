import { useEffect, useState } from "react"

export function MultiSelectCard({ title, name, options, filterBy, setFilterBy, closeOptionsModal, setCloseOptionsModal }) {
    // const [isSelect, setIsSelect] = useState(!closeOptionsModal)
    const isSelect = !closeOptionsModal
    const { specificCodes } = filterBy
    const selectedOptions = specificCodes[name]

    useEffect(() => {

        return () => {
            filterBy.specificCodes[name] = []
        }
    }, [])

    function handleMultiSelect(ev, value) {
        ev.stopPropagation()
        if (selectedOptions.includes(value)) {
            const idx = selectedOptions.findIndex(option => option === value)
            selectedOptions.splice(idx, 1)
        } else {
            selectedOptions.push(value)
        }
        filterBy.specificCodes[name] = selectedOptions
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    function clearOptions(ev) {
        ev.stopPropagation()
        if (!filterBy.specificCodes[name].length) return
        filterBy.specificCodes[name] = []
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    function setOptions(ev) {
        ev.stopPropagation()
        if (closeOptionsModal === name) {
            setCloseOptionsModal(false)
        } else {
            setCloseOptionsModal(name)
        }
        // setIsSelect(!isSelect)
    }

    // function setModalinfo() {
    //     setIsSelect(!isSelect)
    //     if (showMultiModal) {
    //         setShowMultiModal(false)
    //     } else {
    //         const modalInfo = {
    //             name,
    //             options,
    //             selectedOptions
    //         }
    //         console.log(modalInfo);
    //         setShowMultiModal(modalInfo)
    //     }
    // }

    return (
        <article className="multi-select">
            <button className="btn-multi-select" onClick={(ev) => setOptions(ev)}>
                <span className={`${(closeOptionsModal === name) ? 'bold' : ''}`}>{title}</span>
                <img className={`modal-btn ${(closeOptionsModal !== name) ? 'open-modal' : 'close-modal'}`} src="https://res.cloudinary.com/dollaguij/image/upload/v1701785794/wednesday/bwudwrzkha2pdcy3ga7q.svg" alt="" />
            </button>
            {(closeOptionsModal === name) && <div className={`${name} select-modal`}>
                <div className={'multi-select-option'} key={'-1'} onClick={(ev) => clearOptions(ev)}>
                    <span>{'ניקוי'}</span>
                </div>
                {options && options.map(option =>
                    <div className={'multi-select-option'} key={option.code} onClick={(ev) => handleMultiSelect(ev, option.code)}>
                        <span>{option.heb}</span>
                        {selectedOptions.includes(option.code) && <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194254/svg/checked_paj0fg.svg" alt="" />}
                    </div>
                )}
            </div>}
        </article>
    )

}