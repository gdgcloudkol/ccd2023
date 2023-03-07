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

export type AccomodationRequired = 'AO' | 'TO' | 'TA' | 'NO';

export interface SpeakerDataModel {
    has_spoken_previously: boolean;
    previous_talk_links: string;
    travel_support_required: AccomodationRequired;
    user?: string;
    topics_of_expertise: number[];
}

export interface SpeakerFormData {
    title: string;
    description: string;
    prevTalkLink: string;
    typeOfTalk: string;
    travelSupportRequired: string;
    prevTalked: string;
    topicOfExperties: string;
}
export interface TechType {
    name: string;
    id: string;
    slug: string;
    description: string;
}

export interface OptionsType {
    value: number;
    label: string;
}
export interface TalkData {
    title: string;
    description: string;
    format: string;
    overview: string;
    event?: number[];
    speakers: number[];
    technologies: number[];
}
export interface EventData {
    id: number;
    title: string;
    description: string;
    mode: string;
    technologies: number[];
}