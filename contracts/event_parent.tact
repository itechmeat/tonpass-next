import "@stdlib/deploy";
import "@stdlib/ownable";
import "./imports/messages";
import "./event_child";

contract EventParent with Deployable, Ownable {
    owner: Address;
    numEvents: Int as uint256 = 0;

    init() {
        self.owner = sender();
    }

    receive(msg: NewEvent) {
        self.numEvents = self.numEvents + 1;
        let init: StateInit = initOf EventChild(myAddress(), self.numEvents);

        send(SendParameters{
            to: contractAddress(init),
            body: InternalSetEvent{eventItem: msg.eventItem}.toCell(),
            value: ton("0.2"),
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data
        });

        self.reply(NewEventResponse{seqno: self.numEvents}.toCell());
    }

    receive(msg: ActivateEvent) {
        self.requireOwner();
        require(msg.seqno <= self.numEvents, "Event does not exist");
        send(SendParameters{
            to: contractAddress(initOf EventChild(myAddress(), msg.seqno)),
            body: InternalActivateEvent{excess: sender()}.toCell(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
        });
    }

    get fun numEvents(): Int {
        return self.numEvents;
    }

    get fun eventsAddress(seqno: Int): Address {
        return contractAddress(initOf EventChild(myAddress(), seqno));
    }
}