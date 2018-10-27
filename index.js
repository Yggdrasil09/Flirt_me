const instanceLocator="v1:us1:911440ac-8152-45eb-ae29-c8e15e894f74";

const testToken="https://us1.pusherplatform.io/services/chatkit_token_provider/v1/911440ac-8152-45eb-ae29-c8e15e894f74/token";

const username="Yggdrasil";

const roomId=19372166;

const DUMMY_DATA=[
    {
        senderId:"Killmonger",
        text:"wakanda forever!!",
    },
    {
        senderId:"T'Chaka",
        text:"I never yeilded :P", 
    }
];

componentDidMount()
{
    const chatManager=new Chaikit.ChatManager(
        {
            instanceLocator: instanceLocator,
            userId: username,
            tokenProvider: new Chatkit.TokenProvider({
            url: testToken
        }
    )
};

chatManager.connect().then(currentUser => {
    currentUser.subscribeToRoom({
    roomId: roomId,
    hooks: {
      onNewMessage: message => {
        this.setState({
          messages: [...this.state.messages, message]
        })
      }
    }
  })
});

handleChange(e){
    this.setState({
      message: e.target.value
    })
};

class SendMessageForm extends React.Component {
    render() {
      return (
        <form
          className="send-message-form">
          <input
            onChange={this.handleChange}
            value={this.state.message}
            placeholder="Type your message and hit ENTER"
            type="text" />
        </form>
      )
    }
};

class MessageList extends React.Component
{
    render()
    {
        return(
            <ul className="message-list">
                {
                    this.props.message.map(message => {
                        return(
                            <li key={message.id}>
                                <div>
                                    {message.senderId}
                                </div>
                                <div>
                                    {message.text}
                                </div>
                            </li>
                            )
                        }
                    )
                }
            </ul>
        )
    }
};

class App extends React.Component
{
    constructor()
    {
        super()
        this.state={
            messages=DUMMY_DATA
        }
    }
    render()
    {
        return(
            <div className="app">
                <Title/>
                <MessageList messages={this.state.messages}/>
                <SendMessageForm/>
            </div>
        )
    }
}

