import { SelectOptions } from './select-options'

export const formateOptionFilter = (value, options = []) => {
    const item = options.find(c => c.value === value)

    return item ? item.label : '-'
}

export const formateEnumFilter = (value, enumObject) => {
    return enumObject[value] || '-'
}

/**
 *  将 [{label:'是',value:'1'}]枚举转换根据value 值显示label 标签 或者 string : ref 键值对在select-options 中的配置属性名
 * @param value
 * @param param 为数列时，直接匹配对应的值，字符串时，在select-options 匹配对应的名称
 */
export const formateSelectOptionFilter = (value, param) => {
    if (!param) {
        return ''
    }
    const options = Array.isArray(param) ? param : SelectOptions[param] ? SelectOptions[param] : []
    const find = options.find(item =>
        Number(item.value) === Number(value) || (value && (item.value).toString() === value.toString())
    )
    return find ? find.label : ''
}
