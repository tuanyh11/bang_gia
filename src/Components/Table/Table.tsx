import React from 'react'


interface Props {
    headData: string[],
    renderHeadData: (item: string, index: number) => JSX.Element,
    bodyData: any,
    renderBodyData: (item: string, index: number) => JSX.Element
}

const Table: React.FC<Props> = (props) => {
    
    console.log(props.bodyData)
  return (
    <div>
        <table>
            {
                props.headData.length > 0 ? 
                (
                    <thead>
                        <tr>
                            {
                                props.headData.map(props.renderHeadData)
                            }    
                        </tr>
                    </thead>
                ): null
            }

            {
                props.bodyData.length > 0 ? 
                (
                <tbody>
                        {
                            props.bodyData.map(props.renderBodyData)
                        }
                </tbody>
                ): null
            }
        </table>
    </div>
  )
}

export default Table