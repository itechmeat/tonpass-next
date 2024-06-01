message NewEvent {
  eventItem: String;
}

message InternalSetEvent {
  eventItem: String;
}

message ActivateEvent {
  seqno: Int as int256;
}

message InternalActivateEvent {
  excess: Address;
}

message NewEventResponse {
  seqno: Int as int256;
}

message InternalAdd {
  amount: Int as coins;
  origin: Address;
}

message Transfer {
  amount: Int as coins;
  to: Address;
}