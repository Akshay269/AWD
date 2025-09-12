import { FadeIn, SlideUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem, ScaleIn } from './components/ScrollAnimations';

export const TestAnimations = () => {
  return (
    <div style={{ padding: '100vh 20px' }}>
      <FadeIn>
        <h1>This should fade in when scrolling</h1>
      </FadeIn>
      
      <SlideUp delay={0.2}>
        <p>This should slide up from below</p>
      </SlideUp>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '50px 0' }}>
        <SlideInLeft>
          <div style={{ background: '#333', padding: '20px', color: 'white' }}>
            Slide from left
          </div>
        </SlideInLeft>
        
        <SlideInRight>
          <div style={{ background: '#333', padding: '20px', color: 'white' }}>
            Slide from right
          </div>
        </SlideInRight>
      </div>
      
      <ScaleIn>
        <div style={{ background: '#6c8bfd', padding: '40px', color: 'white', textAlign: 'center' }}>
          This should scale in
        </div>
      </ScaleIn>
      
      <StaggerContainer staggerDelay={0.3}>
        <StaggerItem>
          <div style={{ background: '#9c6cfb', padding: '15px', margin: '10px 0', color: 'white' }}>
            Staggered item 1
          </div>
        </StaggerItem>
        <StaggerItem>
          <div style={{ background: '#9c6cfb', padding: '15px', margin: '10px 0', color: 'white' }}>
            Staggered item 2
          </div>
        </StaggerItem>
        <StaggerItem>
          <div style={{ background: '#9c6cfb', padding: '15px', margin: '10px 0', color: 'white' }}>
            Staggered item 3
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
};
