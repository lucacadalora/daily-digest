import React from "react";
import { ArticleLayout } from "@/components/Article/ArticleLayout";
import { getArticleById } from "@/config/articles";
import ArticleSEO from "@/components/SEO/ArticleSEO";
import { ChevronRight, Calendar, FileText, BookOpen, AlertCircle, Search, Users, Globe, Lock, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface KeyFindingProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  color?: string;
}

const KeyFinding: React.FC<KeyFindingProps> = ({ icon, title, children, color = "bg-neutral-50 dark:bg-slate-900" }) => (
  <div className={`rounded-lg ${color} p-5 shadow-sm border border-neutral-200 dark:border-slate-800 mb-6`}>
    <div className="flex items-start space-x-4">
      <div className="mt-1">{icon}</div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    </div>
  </div>
);

interface TimelineItemProps {
  year: string;
  event: string;
  details?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, event, details }) => (
  <div className="relative pl-8 pb-6">
    <div className="absolute left-0 top-0 h-full w-0.5 bg-red-800 dark:bg-red-700" />
    <div className="absolute left-[-4px] top-1 h-3 w-3 rounded-full bg-red-800 dark:bg-red-700 border-2 border-white dark:border-gray-900" />
    <div className="font-mono text-sm font-bold text-red-800 dark:text-red-500 mb-1">{year}</div>
    <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">{event}</div>
    {details && <p className="text-sm text-gray-600 dark:text-gray-400">{details}</p>}
  </div>
);

export default function JFKDeclassifiedFiles() {
  const article = getArticleById("jfk-declassified-files");

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <>
      <ArticleSEO articleId="jfk-declassified-files" />
      
      <ArticleLayout article={article}>
        {/* Introduction */}
        <div className="prose dark:prose-invert lg:prose-lg max-w-none mb-10">
          <p className="text-xl leading-relaxed">
            In March 2025, President Donald Trump ordered the release of long-classified documents related to the 1963 assassination of President John F. Kennedy (JFK). This move fulfilled a campaign promise to bring greater transparency to one of America's most scrutinized events. Over 80,000 pages of previously confidential materials—many fully unredacted for the first time—are now available on the National Archives website.
          </p>
          
          <p>
            While these files offer new insights into the assassination and the complex global tensions of the Cold War era, they also spark fresh questions about government secrecy, possible foreign involvement, and the role of U.S. intelligence agencies.
          </p>
          
          <div className="bg-neutral-100 dark:bg-slate-800/60 rounded-lg p-4 border border-neutral-200 dark:border-slate-700 my-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-red-700" />
              Document Release Details
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800 text-sm">80,000+ pages</Badge>
              <Badge variant="outline" className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-sm">March 2025 release</Badge>
              <Badge variant="outline" className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800 text-sm">62 years after assassination</Badge>
              <Badge variant="outline" className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800 text-sm">National Archives</Badge>
            </div>
          </div>
        </div>
        
        {/* Timeline Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-red-700" /> Timeline of Key Events
          </h2>
          
          <div className="border-l-2 border-red-800 dark:border-red-700 pl-6 space-y-8 ml-2">
            <TimelineItem 
              year="1963"
              event="Lee Harvey Oswald travels to Mexico City, visiting both Cuban and Soviet embassies"
              details="November 22: President Kennedy is assassinated in Dallas, Texas. Oswald is arrested hours later."
            />
            
            <TimelineItem 
              year="1964"
              event="The Warren Commission concludes that Oswald acted alone"
              details="The official investigation's findings would later be challenged by subsequent investigations and newly released documents."
            />
            
            <TimelineItem 
              year="1970s–1990s"
              event="Multiple investigations and congressional hearings re-examine JFK's death"
              details="The House Select Committee on Assassinations in 1979 concluded that Kennedy was 'probably assassinated as a result of a conspiracy.'"
            />
            
            <TimelineItem 
              year="1992"
              event="Congress passes the JFK Records Collection Act"
              details="Law mandated release of all assassination records within 25 years, but several extensions were granted for 'national security' reasons."
            />
            
            <TimelineItem 
              year="2017–2024"
              event="Various presidents allow incremental releases of JFK files"
              details="Certain documents remain sealed or heavily redacted despite the law's requirements."
            />
            
            <TimelineItem 
              year="March 2025"
              event="President Trump orders full declassification of remaining records"
              details="More than 80,000 pages are unveiled in the most substantial release since the 1990s."
            />
          </div>
        </section>
        
        {/* Key Findings Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Search className="mr-2 h-5 w-5 text-red-700" /> 10 Key Revelations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <KeyFinding 
              icon={<div className="bg-indigo-600 dark:bg-indigo-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">1</div>}
              title="Lee Harvey Oswald's Surveillance"
              color="bg-indigo-50 dark:bg-indigo-900/20"
            >
              <p>
                Newly disclosed materials confirm that Oswald's visits to Soviet and Cuban embassies in Mexico City were monitored extensively by the CIA. Unredacted notes indicate deeper agency awareness of his interactions, including an intercepted phone call to a KGB agent in September 1963.
              </p>
            </KeyFinding>
            
            <KeyFinding 
              icon={<div className="bg-red-600 dark:bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">2</div>}
              title="CIA Negligence or Complicity"
              color="bg-red-50 dark:bg-red-900/20"
            >
              <p>
                Internal memos hint that the agency was alerted to Oswald's increasingly erratic behavior but did not effectively act. Critics point to potential negligence—or worse, complicity—intensifying debate around the CIA's true role.
              </p>
            </KeyFinding>
            
            <KeyFinding 
              icon={<div className="bg-blue-600 dark:bg-blue-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">3</div>}
              title="KGB Assessment of Oswald"
              color="bg-blue-50 dark:bg-blue-900/20"
            >
              <p>
                A senior KGB officer's memo concludes that Oswald was "unstable and self-motivated," but not under KGB control, contradicting suspicions that Oswald may have been a Soviet operative.
              </p>
            </KeyFinding>
            
            <KeyFinding 
              icon={<div className="bg-amber-600 dark:bg-amber-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">4</div>}
              title="Second Shooter Evidence"
              color="bg-amber-50 dark:bg-amber-900/20"
            >
              <p>
                Certain ballistic analyses and eyewitness accounts appear to have been given new consideration, reopening the perennial question of a possible second shooter in Dealey Plaza.
              </p>
            </KeyFinding>
            
            <KeyFinding 
              icon={<div className="bg-emerald-600 dark:bg-emerald-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">5</div>}
              title="Mafia Connections"
              color="bg-emerald-50 dark:bg-emerald-900/20"
            >
              <p>
                Records suggest organized crime figures had the motive and means to target Kennedy, particularly due to Robert Kennedy's crackdown on the mob. However, specifics remain fragmented.
              </p>
            </KeyFinding>
            
            <KeyFinding 
              icon={<div className="bg-purple-600 dark:bg-purple-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">6</div>}
              title="Unredacted FBI Records"
              color="bg-purple-50 dark:bg-purple-900/20"
            >
              <p>
                Over 2,400 new FBI documents illuminate the bureau's surveillance of Oswald and prior knowledge of his volatile behavior, suggesting the FBI may have under-communicated concerns.
              </p>
            </KeyFinding>

            <KeyFinding 
              icon={<div className="bg-rose-600 dark:bg-rose-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">7</div>}
              title="Cold War Tensions"
              color="bg-rose-50 dark:bg-rose-900/20"
            >
              <p>
                U.S. officials were deeply worried that Oswald's Soviet and Cuban ties might escalate into a larger conflict. Internal memos show frantic efforts to avert global panic and prevent the assassination from being perceived as a Soviet-backed act of war.
              </p>
            </KeyFinding>

            <KeyFinding 
              icon={<div className="bg-cyan-600 dark:bg-cyan-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">8</div>}
              title="Propaganda Operations"
              color="bg-cyan-50 dark:bg-cyan-900/20"
            >
              <p>
                Documents reveal CIA propaganda campaigns to shape international opinion about Oswald's motivations both before and after the assassination. Controlling the narrative abroad was a major priority for U.S. intelligence in the tense Cold War environment.
              </p>
            </KeyFinding>

            <KeyFinding 
              icon={<div className="bg-orange-600 dark:bg-orange-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">9</div>}
              title="Technical Espionage Details"
              color="bg-orange-50 dark:bg-orange-900/20"
            >
              <p>
                Several files detail CIA phone taps in Mexico City monitoring traffic between Soviet and Cuban officials, capturing Oswald's communications. The scale of these wiretaps underlines the agency's focus on the region during Cold War rivalries.
              </p>
            </KeyFinding>

            <KeyFinding 
              icon={<div className="bg-teal-600 dark:bg-teal-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">10</div>}
              title="Transparency Milestone"
              color="bg-teal-50 dark:bg-teal-900/20"
            >
              <p>
                This 2025 release is the most significant since the 1990s. Despite thousands of pages now unredacted, skepticism persists as some crucial documents remain sealed, with many experts believing critical pieces of the JFK puzzle are still missing.
              </p>
            </KeyFinding>
          </div>
        </section>
        
        {/* Investigative Analysis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Globe className="mr-2 h-5 w-5 text-red-700" /> Investigative Analysis
          </h2>
          
          <div className="prose dark:prose-invert lg:prose-lg max-w-none">
            <p>
              The newly declassified files not only provide factual revelations but also paint a complex picture of Cold War America and its intelligence operations. The documents reveal the depth of surveillance capabilities that existed in the 1960s and how these technologies were deployed against potential threats - both foreign and domestic.
            </p>
            
            <div className="bg-neutral-100 dark:bg-slate-800/60 p-5 rounded-lg border border-neutral-200 dark:border-slate-700 my-6">
              <h3 className="text-xl font-semibold mb-3">Historical Significance</h3>
              <p className="mb-0">
                These documents are significant not only for what they reveal about the Kennedy assassination, but also for how they illuminate the operational methods of U.S. intelligence agencies during the Cold War. They provide an unprecedented window into the sophisticated counterintelligence operations of the era and the complex web of international espionage that characterized U.S.-Soviet relations.
              </p>
            </div>
            
            <p>
              Historians and researchers now face the daunting task of organizing and interpreting this massive trove of information. While the documents answer some long-standing questions, they inevitably generate new ones - particularly about the decision-making processes that led certain information to remain classified for so many decades after the events they describe.
            </p>
          </div>
        </section>
        
        {/* Public Reaction Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-red-700" /> Ongoing Questions and Public Reaction
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 dark:bg-slate-900 p-5 rounded-lg border border-neutral-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold mb-3">Conspiracy Theories</h3>
              <p className="text-gray-700 dark:text-gray-300">
                These releases have energized long-standing theories—from CIA involvement and second shooters to mafia plots. While the files unveil new data points, they haven't furnished a "smoking gun" to end all speculation.
              </p>
            </div>
            
            <div className="bg-neutral-50 dark:bg-slate-900 p-5 rounded-lg border border-neutral-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold mb-3">Government Transparency</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Supporters applaud the decision as part of a broader push to declassify historical records related to high-profile events, including the assassinations of Robert F. Kennedy and Martin Luther King Jr.
              </p>
            </div>
            
            <div className="bg-neutral-50 dark:bg-slate-900 p-5 rounded-lg border border-neutral-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold mb-3">Skeptics</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Critics argue that remaining withholdings and the sheer volume of documents—over six million pages in the broader collection—obscure meaningful truths, with some critical evidence possibly still hidden.
              </p>
            </div>
          </div>
        </section>
        
        {/* Conclusion */}
        <section className="mb-8">
          <Separator className="my-8" />
          
          <div className="prose dark:prose-invert lg:prose-lg max-w-none">
            <h2>Conclusion</h2>
            <p>
              The March 2025 declassification marks a pivotal step toward uncovering more of the story behind November 22, 1963. The documents cast new light on Lee Harvey Oswald's movements, intelligence agencies' surveillance efforts, and the complex diplomatic maneuvers underlining Cold War anxieties. Yet, the core mystery remains partially unresolved.
            </p>
            
            <p>
              By revealing more layers of the investigation—and by leaving others still murky—this release ensures that the quest for definitive answers continues, underscoring how one event from 1963 can still cast a long shadow on America's understanding of its own history.
            </p>
            
            <div className="p-5 border-l-4 border-red-800 dark:border-red-700 bg-neutral-50 dark:bg-slate-900/60 my-6">
              <p className="text-lg font-semibold italic mb-0">
                "In the end, this landmark release may reinforce rather than dispel the public's fascination with JFK's assassination."
              </p>
            </div>
          </div>
        </section>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {article.tags?.map(tag => (
            <Badge key={tag} variant="secondary" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </ArticleLayout>
    </>
  );
}