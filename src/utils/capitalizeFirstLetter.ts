/**
 * Делает первую букву строки заглавной
 *
 * @param    {string | null | undefined}  string  строка
 *
 * @returns  {string}                             строка с заглавной первой буквой
 */

export const capitalizeFirstLetter = (string: string | null | undefined): string => {
  // Проверка на null или пустую строку
  if (!string) {
    return string || ''
  }

  // Сделать первую букву заглавной и добавить остальную часть строки
  const firstLetter = string.charAt(0).toUpperCase()
  const restOfString = string.slice(1)

  return firstLetter + restOfString
}
