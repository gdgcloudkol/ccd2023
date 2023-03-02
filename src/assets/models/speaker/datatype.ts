export interface SpeakerData {
    profilePicture: string;
    fullName: string;
    tagLine: string;
}

export interface SpeakerModalData extends SpeakerData {
    bio: string;
}

export interface SpeakerPayload extends SpeakerModalData {

}