import MessagePlate from "./MessagePlate";

export default function Chat() {
    return (
        <>
            <div className="chat-container">

                <MessagePlate incoming={true}>Hello! How are you?</MessagePlate>

                <MessagePlate incoming={false}>I'm good thanks!</MessagePlate>

                <MessagePlate incoming={true}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit laboriosam omnis, incidunt maiores in quibusdam id esse obcaecati assumenda possimus et! Recusandae dignissimos quos eum molestias odit voluptates incidunt illo.</MessagePlate>

                <MessagePlate incoming={false}>Aszkadaba koszorogoliwa kaszkaj kaszkaj kaszkaj!!! Nomoenomenome czary mary hiper sliper?</MessagePlate>

                <MessagePlate incoming={true}>Hello! How are you?</MessagePlate>

                <MessagePlate incoming={true}>Aj aj aj...</MessagePlate>

                <MessagePlate incoming={false} date={"2025-05-16 08:04:15"}>I'm good thanks!</MessagePlate>

            </div>
        </>
    );
}