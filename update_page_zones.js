const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add parsing logic for home_zones
const sectionOrderCode = `  const defaultOrder = ['hero', 'featured', 'about', 'novedades', 'investment', 'blog', 'valor', 'servicios', 'zonas', 'cta'];`;
const newSectionOrderCode = `  const defaultZones = [
    { name: "Santa Rosa de Cabal", subtitle: "Sede Principal", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Pereira", subtitle: "El corazón del Eje", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_L0yirY1K-zQ9Rz61Iw9XrgwEOFOYHsz9Mi4C2GL8iMlUk_7DKzJxq4WEuwF45iYPUrfjyGzV8aLQsVJuWb_VMhpzMDmO8P0SfgipYahQLy4sLsU97cD7jfgBeWpcKARpB95kDvRsW9_v97y1rbCzwKWHhgkcO6FakcTLb9mY3Nr_iUCMoTKBiHBSYxYEs2nU-woY8NESiX3BQMkIZFFnrttSqrnC0JfiIv4lv13mNQ_2rKUpzMdDXCkEFQ0d919ch-mo-zIBq4I" },
    { name: "Cerritos", subtitle: "Exclusividad y naturaleza", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDPz50Z_yrUQy_PEMzeJA2eT4nypHRgxNRk-0T-vFLVb39xuLpnMfHTonvsMRjqB2THZvSxRAYxEWhvByzcg4WohUG3N0sGrC4dAm8-aj_ibb7u7gFrvOb1B1nAhp9RHG4vLpGCxTM4iFxI-XyRYNg9LyIPlO8Co1yST8yYfQi7Sr1Tnp1I5L8fNFHNx_OwLUKV0BvtrWKviQub-4PpeJrGDMDuFUe7hLI_fG0XEK1SQ31arPzqVCh7zmsWKeNDLR6e4pYkztEeg4" },
    { name: "Dosquebradas", subtitle: "Crecimiento residencial", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKqj1ingSzkGRB-XKNQQfj48LN2rQQAusPghCy0vMX7bylVfR_CLzlPDAcSAm5ekKFLOS9a1T9MgiaYA-vyO0Uygl7WtoqIhPii4oAbcLWt6hBElIFrykUxjD_191VB5HZ7jvZs1YxTAEoFMkKWJcPXBI6NIVmpRlqBERrRCAOCtQ-bOSwsSCQd99FGv0np91wa-6mOMi85DH2tV3wVOUI7qzOa2R1oy8C5tb2_OYZWMZQnIK9hwDsY0G-kXXDOA4DqFfn7SNcq7U" }
  ];
  let homeZones = defaultZones;
  if (settings.home_zones) {
    try {
      homeZones = JSON.parse(settings.home_zones);
    } catch(e){}
  }

  const defaultOrder = ['hero', 'featured', 'about', 'novedades', 'investment', 'blog', 'valor', 'servicios', 'zonas', 'cta'];`;
code = code.replace(sectionOrderCode, newSectionOrderCode);

// 2. Replace hardcoded zones block
const oldZonesBlock = `<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
<div className="relative h-96 rounded-2xl overflow-hidden group">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A vibrant street scene in downtown Pereira, Colombia, with modern office buildings and green plazas under a bright blue sky. The visual style is crisp and professional, emphasizing the urban growth and commercial potential of the city. Soft lighting with high contrast to evoke a sense of progress and energy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_L0yirY1K-zQ9Rz61Iw9XrgwEOFOYHsz9Mi4C2GL8iMlUk_7DKzJxq4WEuwF45iYPUrfjyGzV8aLQsVJuWb_VMhpzMDmO8P0SfgipYahQLy4sLsU97cD7jfgBeWpcKARpB95kDvRsW9_v97y1rbCzwKWHhgkcO6FakcTLb9mY3Nr_iUCMoTKBiHBSYxYEs2nU-woY8NESiX3BQMkIZFFnrttSqrnC0JfiIv4lv13mNQ_2rKUpzMdDXCkEFQ0d919ch-mo-zIBq4I"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
<h4 className="text-white font-headline-md text-headline-md">Pereira</h4>
<p className="text-white/80 font-body-md">El corazón del Eje</p>
</div>
</div>
<div className="relative h-96 rounded-2xl overflow-hidden group">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A lush aerial view of the Cerritos area in Pereira, featuring luxury mansions with tile roofs nestled among rolling green coffee plantations and tropical forests. The lighting is soft morning mist typical of the Colombian highlands. The style is serene, expansive, and high-status, focusing on privacy and nature." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDPz50Z_yrUQy_PEMzeJA2eT4nypHRgxNRk-0T-vFLVb39xuLpnMfHTonvsMRjqB2THZvSxRAYxEWhvByzcg4WohUG3N0sGrC4dAm8-aj_ibb7u7gFrvOb1B1nAhp9RHG4vLpGCxTM4iFxI-XyRYNg9LyIPlO8Co1yST8yYfQi7Sr1Tnp1I5L8fNFHNx_OwLUKV0BvtrWKviQub-4PpeJrGDMDuFUe7hLI_fG0XEK1SQ31arPzqVCh7zmsWKeNDLR6e4pYkztEeg4"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
<h4 className="text-white font-headline-md text-headline-md">Cerritos</h4>
<p className="text-white/80 font-body-md">Exclusividad y naturaleza</p>
</div>
</div>
<div className="relative h-96 rounded-2xl overflow-hidden group">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="The modern skyline of Dosquebradas, Risaralda, seen from a distance with the Andes mountains in the background. Contemporary apartment complexes dominate the landscape. The visual tone is bright and optimistic, reflecting a developing urban residential area. High-key lighting with a clean, minimalist finish." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKqj1ingSzkGRB-XKNQQfj48LN2rQQAusPghCy0vMX7bylVfR_CLzlPDAcSAm5ekKFLOS9a1T9MgiaYA-vyO0Uygl7WtoqIhPii4oAbcLWt6hBElIFrykUxjD_191VB5HZ7jvZs1YxTAEoFMkKWJcPXBI6NIVmpRlqBERrRCAOCtQ-bOSwsSCQd99FGv0np91wa-6mOMi85DH2tV3wVOUI7qzOa2R1oy8C5tb2_OYZWMZQnIK9hwDsY0G-kXXDOA4DqFfn7SNcq7U"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
<h4 className="text-white font-headline-md text-headline-md">Dosquebradas</h4>
<p className="text-white/80 font-body-md">Crecimiento residencial</p>
</div>
</div>
<div className="relative h-96 rounded-2xl overflow-hidden group">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A quiet, upscale residential street in the Pinares neighborhood of Pereira, showing elegant mid-rise apartment buildings with balconies and lush landscaping. The atmosphere is sophisticated and peaceful. The lighting is warm afternoon sun through leafy trees, creating a premium neighborhood feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh45Z_tL_BysqHezKGhTVvpf9Yu7VshOGa5-zlaPuKoo-7GCYMn4bTHxCmLt3eWM-7NoOifddRTQfprw11-bR9KgSYsQfthhlwVLwIpQfxcGQ5eKvEY7w_B2AQBGlEG4BL1X-Ef_QZ4rDO25EeISylb1xes_EY7muGyMjRj0DM3nH0j0lRGz-OXrdJ1Q8JLyJ0x09Z83I_jl7EqA4un1Mwn42qPaG4YSb0O8t5jiMfbjGHr0RcSE9IeLsq1hUJA3Xe6SlUWwlKLLI"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
<h4 className="text-white font-headline-md text-headline-md">Pinares</h4>
<p className="text-white/80 font-body-md">Prestigio y confort</p>
</div>
</div>
</div>`;

const newZonesBlock = `<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
{homeZones.map((z: any, i: number) => (
  <div key={i} className="relative h-96 rounded-2xl overflow-hidden group">
    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={z.image || "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt={z.name} />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
      <h4 className="text-white font-headline-md text-headline-md">{z.name}</h4>
      <p className="text-white/80 font-body-md">{z.subtitle}</p>
    </div>
  </div>
))}
</div>`;

code = code.replace(oldZonesBlock, newZonesBlock);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Updated page.tsx with dynamic zones");
