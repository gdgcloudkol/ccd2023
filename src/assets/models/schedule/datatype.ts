export interface ScheduleData{
    date:string;
    timeSlots:TimeSlot[];
}
export interface TimeSlot{
    rooms:RoomData[];
}
export interface RoomData{
    session:SessionData;
}
export interface SessionData{
    title:string;
    description:string|null;
    startsAt:string;
    endsAt:string;
    room:string;
    speakers?:SpeakerData[];
    categories?:CategoryData[];
}
export interface SpeakerData{
    name:string;
    profilePicture:string;
}
export interface CategoryData{
    name:string;
    categoryItems:CategoryItems[];
}
export interface CategoryItems{
    name:string
}
