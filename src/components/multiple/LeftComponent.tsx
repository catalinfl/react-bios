
type ComponentTypes = "advanced" | "power" | "boot" | "security" | "exit"


export interface LeftComponentProps<T extends object> {
    data: T;
    componentType: ComponentTypes;
}


const LeftComponent = <T extends object>({ data, componentType }: LeftComponentProps<T>) => {

    console.log(data)
    console.log(componentType)

  return (
    <div>
        {Object.entries(data).map(([key, value]) => (
                <p key={key}>
                    <strong>{key}:</strong> {String(value)}
                </p>
        ))}
    </div>
)
}

export default LeftComponent


