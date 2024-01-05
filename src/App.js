import "./App.css";
import { useState } from "react";
import { DNA } from "react-loader-spinner";
import WordCloud from "react-d3-cloud";
import axios from "axios";

function App() {
  const [brands, setBrands] = useState([]);
  const [id, setId] = useState("Enter Instagram ID");
  const [brancdInput, setBrandInput] = useState("Enter Brands");
  const [pageState, setPage] = useState("before");

  const [response, setRespone] = useState([
    {
      mergedWordCloud: {
        topic_1: 0.2,
        topic_2: 0.15,
        topic_3: 0.1,
        topic_4: 0.1,
        topic_5: 0.1,
        topic_6: 0.1,
        topic_7: 0.1,
        topic_8: 0.1,
        topic_9: 0.05,
        topic_10: 0.05,
        coffee: 0.35,
        delicious: 0.2,
        tasty: 0.15,
        aromatic: 0.1,
        energizing: 0.1,
        relaxing: 0.05,
        strong: 0.05,
        هيا: 0.15,
        و: 0.05,
        "يا بنتي": 0.1,
        نسخاي: 0.1,
        تعمل: 0.05,
        قلبي: 0.1,
        سقط: 0.1,
        شفت: 0.1,
        الفيس: 0.1,
        متاعك: 0.15,
        Tunis: 0.2,
        Country: 0.15,
        Heritage: 0.1,
        Culture: 0.1,
        History: 0.1,
        Beaches: 0.08,
        Cuisine: 0.08,
        Hospitality: 0.07,
        Traditions: 0.07,
        Arab: 0.05,
        Berber: 0.05,
        Mosques: 0.05,
      },
      importantTopics: [
        "No",
        "She",
        "Coffee",
        "Flavors",
        "Enjoyment",
        "Expressions of excitement",
        "Addressing a loved one",
        "Feeling upset or betrayed",
        "Social media references",
        "Tunisia",
        "Tunis",
        "Country",
        "Year",
        "Time",
        "Progression",
        "My grandmother",
        "God's will",
        "Mother",
        "Family",
      ],
      brandRankings: [
        {
          brandName: "Porsche",
          weight: 0.25,
        },
        {
          brandName: "Lindex",
          weight: 0.2,
        },
        {
          brandName: "Avene",
          weight: 0.15,
        },
        {
          brandName: "Zara",
          weight: 0.1,
        },
      ],
      topBrandFitExplanation: {
        brandName: "Porsche",
        explanation:
          "Porsche is a luxury brand that aligns with the influencer's description of a scenic location, romantic and feminine aesthetic, and festive atmosphere. The brand represents elegance, sophistication, and celebration, which resonate with the influencer's content.",
      },
    },
    201,
  ]);

  function processClick() {
    setPage("loading");

    const requestBody = {
      instagram_id: id,
      brand_list: brands,
    };

    // Axios POST request with a JSON body
    axios
      .post("https://192.168.0.135:5001/analyze-instagram ", requestBody)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });

    setTimeout(() => {
      setPage("after");
      let obj = [];
      for (let i in response[0].mergedWordCloud) {
        obj.push({ text: i, value: response[0].mergedWordCloud[i] });
      }
      console.log(obj);
      response[0].mergedWordCloud = obj;
    }, 1000);
  }

  return (
    <div className="App">
      <div className="Hero">
        <img src="https://app.memorality.duckdns.org/favicon.ico"></img>
        <div className="heroText">
          <h1>MEMORALITY</h1>
          <p>
            We Infusing AI with Memories and Personality to provide State of the
            Art Generative AI solutions to your Company
          </p>
        </div>
      </div>
      {pageState === "before" ? (
        <div className="heroWrapper">
          <h1>INSTASCRIBE</h1>
          <p>
            This tool offers access to a diverse array of Natural Language
            Processing (NLP) tools tailored for analyzing Instagram posts. It
            facilitates real-time analysis of trends and provides valuable
            insights into the activities of social media accounts
          </p>
          <div className="inputContainer">
            <input
              value={id}
              onClick={() => {
                setId("");
              }}
              onChange={(e) => {
                setId(e.target.Value);
              }}
            ></input>
            <input
              value={brancdInput}
              onClick={() => {
                setBrandInput("");
              }}
              onChange={(e) => {
                setBrandInput(e.target.Value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setBrands([...brands, e.target.value]);
                  setBrandInput("");
                }
              }}
            ></input>
            {brands.map((b, i) => {
              return (
                <div className="brandCard">
                  <label>{b}</label>
                  <span
                    class="material-symbols-outlined"
                    onClick={() => {
                      setBrands([
                        ...brands.slice(0, i),
                        ...brands.slice(i + 1),
                      ]);
                    }}
                  >
                    close
                  </span>
                </div>
              );
            })}
            <button
              className="processBtn"
              onClick={() => {
                processClick();
              }}
            >
              Process
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {pageState === "loading" ? (
        <div className="loadingWrapper">
          <DNA
            visible={true}
            height="180"
            width="180"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        ""
      )}
      {pageState === "after" ? (
        <div className="afterWrapper">
          <div className="wordsCluster">
            <h3>Words Cluster</h3>
            <WordCloud
              data={[]}
              width={70}
              height={30}
              font="Times"
              fill="#fff"
              fontSize={3}
            />
          </div>

          <div className="tableWrapper">
            <h3>Topic Modelling</h3>

            {response[0].importantTopics.map((a) => {
              return (
                <div className="Table">
                  <label>{a}</label>
                </div>
              );
            })}
          </div>
          <div className="rankingSectionContainer">
            {response[0].brandRankings.map((m) => {
              return (
                <div className="matchingItem">
                  <span>{m.weight}</span>
                  <label>{m.brandName}</label>
                </div>
              );
            })}
          </div>
          <div className="topBrandWrapper">
            <h3> Top Company</h3>
            <h4>{response[0].topBrandFitExplanation.brandName}</h4>
            <h5>{response[0].topBrandFitExplanation.explanation}</h5>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
