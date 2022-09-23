export const mask = (mask) => (currentValueRaw) => {
    const currentValue = currentValueRaw || ''
    const maxAllowedLength = (mask.match(/\*/g) || []).length
    let onlyNumbers = currentValue.replace(/[^0-9]/g, '')

    if (onlyNumbers.length > maxAllowedLength) {
        onlyNumbers = onlyNumbers.slice(0, maxAllowedLength)
    }

    const formatedValue = []
    let valueIndex = 0
    let maskIndex = 0
    while (valueIndex < onlyNumbers.length) {
        if (mask[maskIndex] === '*') {
            formatedValue.push(onlyNumbers[valueIndex])
            valueIndex += 1
        }
        else {
            formatedValue.push(mask[maskIndex])
        }
        maskIndex += 1
    }
    if (
        maxAllowedLength === onlyNumbers.length &&
        mask[mask.length - 1] !== '*'
    ) {
        formatedValue.push(mask[mask.length - 1])
    }
    return formatedValue.join('')
}

export const phoneMask = mask('** * ****-****')
export const dateMask = mask('**/**/****')