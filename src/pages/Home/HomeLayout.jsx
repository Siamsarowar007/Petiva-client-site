import React from 'react';
import Banner from '../../Banner/Banner';
import TagsSection from '../TagsSection/TagsSection';
import AnnouncementSection from '../AnnouncementSection/AnnouncementSection';
import AnnouncementList from './Home/AnnouncementList';




const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <TagsSection></TagsSection>
            <AnnouncementSection></AnnouncementSection>
        
        </div>
    );
};

export default HomeLayout;