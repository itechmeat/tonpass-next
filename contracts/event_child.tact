import "@stdlib/deploy";
import "./imports/messages";

struct EventDetails {
    eventItem: String;
    isActive: Bool;
}

contract EventChild with Deployable {
    parent: Address;
    seqno: Int as uint256;
    eventItem: String = "";
    isActive: Bool = false;

    init(parent: Address, seqno: Int) {
        self.parent = parent;
        self.seqno = seqno;
    }

    receive(msg: InternalSetEvent) {
        require(sender() == self.parent, "Only parent can set event");
        self.eventItem = msg.eventItem;
    }

    receive(msg: InternalActivateEvent) {
        require(sender() == self.parent, "Only parent can set event");
        self.isActive = true;
        send(SendParameters{
            to: msg.excess,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
        });
    }

    get fun eventDetails(): EventDetails {
        return EventDetails{
            eventItem: self.eventItem,
            isActive: self.isActive,
        };
    }
}