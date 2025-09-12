import { FadeIn, SlideUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem, ScaleIn } from './ScrollAnimations';
import { SwipeReveal, SwipeTextReveal, MagneticSwipe } from './SwipeAnimations';
import { Unique169Animation } from './Unique169Animation';

export const AnimationDemo = () => {
  return (
    <div style={{ padding: '100px 0', background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ color: 'var(--text)', marginBottom: '20px' }}>Animation Testing Area</h2>
          <p style={{ color: 'var(--muted)' }}>
            Scroll up and down to see animations trigger every time!
          </p>
        </div>
        
        <div style={{ display: 'grid', gap: '60px' }}>
          {/* Row 1: Basic animations */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <FadeIn>
              <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: '8px' }}>
                <h3>FadeIn Animation</h3>
                <p>This should fade in every time you scroll to it!</p>
              </div>
            </FadeIn>
            
            <SlideUp delay={0.2}>
              <div style={{ padding: '40px', background: 'var(--surface)', borderRadius: '8px' }}>
                <h3>SlideUp Animation</h3>
                <p>This should slide up from below each time!</p>
              </div>
            </SlideUp>
          </div>
          
          {/* Row 2: Directional slides */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <SlideInLeft>
              <div style={{ padding: '40px', background: 'var(--primary)', borderRadius: '8px', color: 'white' }}>
                <h3>SlideInLeft</h3>
                <p>Slides from the left every time!</p>
              </div>
            </SlideInLeft>
            
            <SlideInRight>
              <div style={{ padding: '40px', background: 'var(--accent)', borderRadius: '8px', color: 'white' }}>
                <h3>SlideInRight</h3>
                <p>Slides from the right every time!</p>
              </div>
            </SlideInRight>
          </div>
          
          {/* Row 3: Advanced animations */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <ScaleIn>
              <MagneticSwipe strength={0.2}>
                <div style={{ padding: '40px', background: '#ff4444', borderRadius: '8px', color: 'white' }}>
                  <h3>ScaleIn + Magnetic</h3>
                  <p>Scales in and follows your mouse!</p>
                </div>
              </MagneticSwipe>
            </ScaleIn>
            
            <SwipeReveal direction="up">
              <div style={{ padding: '40px', background: '#44ff44', borderRadius: '8px', color: '#000' }}>
                <SwipeTextReveal text="Swipe Text Reveal" className="h3" />
                <p>Text reveals word by word!</p>
              </div>
            </SwipeReveal>
          </div>
          
          {/* Row 4: 16:9 Unique Expertise animation */}
          <div>
            <Unique169Animation />
          </div>
          
          {/* Row 5: Staggered animation */}
          <StaggerContainer staggerDelay={0.2}>
            <div style={{ textAlign: 'center' }}>
              <StaggerItem>
                <h3>Staggered Animation</h3>
              </StaggerItem>
              <StaggerItem>
                <p>These items appear one after another</p>
              </StaggerItem>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
                {[1, 2, 3, 4].map(num => (
                  <StaggerItem key={num}>
                    <div style={{ 
                      padding: '20px', 
                      background: `hsl(${num * 60}, 70%, 50%)`, 
                      borderRadius: '8px',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      Item {num}
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </div>
          </StaggerContainer>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '80px', padding: '40px', background: 'var(--surface)', borderRadius: '8px' }}>
          <h3>✅ Test Instructions</h3>
          <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <li>Scroll down to see all animations trigger</li>
            <li>Scroll back up past this section</li>
            <li>Scroll down again - all animations should trigger again!</li>
            <li>If animations repeat every time, the fix is working! 🎉</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
