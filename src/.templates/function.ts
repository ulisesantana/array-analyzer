export enum Template {
    MAP = 'MAP',
    FILTER = 'FILTER',
    REDUCE = 'REDUCE',
}

const templateContent = {
    [Template.MAP]: `function map(data){
    return data.map( ({first_name, last_name, position}) => 
    \`My name is \${first_name} \${last_name} and my position is \${position}\`
  )
}`,
    [Template.FILTER]: `function filter(data){
    return data.filter( ({salary}) => salary > 45)
}`,
    [Template.REDUCE]: `function reduce(data){
    const [employeesWithMaxSalary] = data.reduce(([employees, maxSalary], currentEmployee) => {
        if (currentEmployee.salary > maxSalary) {
          return [[currentEmployee], currentEmployee.salary]
        }
        if (currentEmployee.salary === maxSalary) {
          return [employees.concat(currentEmployee), maxSalary]
        }
        return [employees, maxSalary]
    }, [undefined, 0])
    return employeesWithMaxSalary
}`
}

export const TemplateDictionary = new Proxy<Record<string, string>>(
    templateContent,
    {
        get: function (target, prop) {
            if (isTemplate(prop, target)) {
                return target[prop]
            }
            return target[Template.MAP]
        }
    })

function isTemplate(key: string | symbol | number, target: Record<Template, string>): key is Template {
    return key in target
}
