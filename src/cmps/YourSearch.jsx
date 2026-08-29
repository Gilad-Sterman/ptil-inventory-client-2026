export function YourSearch({ filterBy, setFilterBy, BEGGED, STRING, TYING }) {
    const { specificCodes } = filterBy
    const { begged, size, strings, tying } = specificCodes

    function removeOption(option, type) {
        let newItemCodes
        if (type === 'begged') {
            newItemCodes = begged.filter(b => b !== option)
        } else if (type === 'size') {
            newItemCodes = size.filter(s => s !== option)
        } else if (type === 'strings') {
            newItemCodes = strings.filter(s => s !== option)
        } else {
            newItemCodes = tying.filter(t => t !== option)
        }
        specificCodes[type] = newItemCodes
        const newFilter = JSON.parse(JSON.stringify(filterBy))
        setFilterBy(newFilter)
    }

    return (
        <section className='your-search'>
            <div className="option">
                {begged.map(begged => <span key={`1${begged}`} onClick={() => removeOption(begged, 'begged')}>
                    <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194245/svg/x_ti24ab.svg" alt="" />
                    {BEGGED.filter(b => b.code === begged)[0].heb}
                </span>)}
                {size.map(size => <span key={`2${size}`} onClick={() => removeOption(size, 'size')}>
                    <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194245/svg/x_ti24ab.svg" alt="" />
                    {size}
                </span>)}
                {strings.map(string => <span key={`3${string}`} onClick={() => removeOption(string, 'strings')}>
                    <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194245/svg/x_ti24ab.svg" alt="" />
                    {STRING.filter(s => s.code === string)[0].heb}
                </span>)}
                {tying.map(tie => <span key={`1${tie}`} onClick={() => removeOption(tie, 'tying')}>
                    <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194245/svg/x_ti24ab.svg" alt="" />
                    {TYING.filter(t => t.code === tie)[0].heb}
                </span>)}
            </div>
        </section>
    )
}