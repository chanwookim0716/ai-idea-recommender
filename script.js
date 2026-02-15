// Ensure this script file is correctly parsed and executed.
console.log("script.js loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    const topicInput = document.getElementById("topicInput");
    const generateIdeasBtn = document.getElementById("generateIdeasBtn");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const ideasOutput = document.getElementById("ideasOutput");

    generateIdeasBtn.addEventListener("click", generateIdeas);

    async function generateIdeas() {
        const topic = topicInput.value.trim();

        if (!topic) {
            alert("주제를 입력해주세요!");
            return;
        }

        // Clear previous ideas
        ideasOutput.innerHTML = "";
        // Show loading spinner and disable input/button
        loadingSpinner.classList.remove("d-none");
        generateIdeasBtn.disabled = true;
        topicInput.disabled = true;

        try {
            // --- AI API Integration Placeholder ---
            // Replace this simulated API call with your actual AI model API call.
            // Example: Using fetch to a generative AI API (e.g., Google Gemini API, OpenAI GPT, etc.)
            //
            // const response = await fetch("YOUR_AI_API_ENDPOINT", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": "Bearer YOUR_API_KEY" // If required
            //     },
            //     body: JSON.stringify({
            //         prompt: `Generate a list of creative ideas for: ${topic}`,
            //         max_ideas: 5 // Adjust as needed
            //     })
            // });
            //
            // if (!response.ok) {
            //     throw new Error(\`API error: \${response.statusText}\`);
            // }
            //
            // const data = await response.json();
            // const aiIdeas = data.ideas || ["API에서 아이디어를 불러오지 못했습니다."]; // Adjust based on API response structure
            // --- End AI API Integration Placeholder ---


            // Simulated AI API call with a delay
            const aiIdeas = await new Promise(resolve => {
                setTimeout(() => {
                    const mockIdeas = [
                        `${topic}을 위한 혁신적인 마케팅 캠페인`,
                        `${topic}을 활용한 새로운 모바일 앱 아이디어`,
                        `${topic} 기반의 소셜 미디어 콘텐츠 전략`,
                        `${topic} 테마의 교육용 게임 개발`,
                        `${topic} 관련 커뮤니티 플랫폼 구축`,
                    ];
                    resolve(mockIdeas);
                }, 2000); // Simulate 2-second API call
            });

            displayIdeas(aiIdeas);

        } catch (error) {
            console.error("아이디어 생성 중 오류 발생:", error);
            ideasOutput.innerHTML = `<div class="alert alert-danger" role="alert">아이디어 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>`;
        } finally {
            // Hide loading spinner and enable input/button
            loadingSpinner.classList.add("d-none");
            generateIdeasBtn.disabled = false;
            topicInput.disabled = false;
        }
    }

    function displayIdeas(ideas) {
        if (ideas.length === 0) {
            ideasOutput.innerHTML = `<p class="text-muted">생성된 아이디어가 없습니다.</p>`;
            return;
        }

        ideas.forEach((idea, index) => {
            const ideaCard = document.createElement("div");
            ideaCard.classList.add("card", "idea-card", "mb-3"); // Bootstrap card classes
            ideaCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">아이디어 #${index + 1}</h5>
                    <p class="card-text">${idea}</p>
                </div>
            `;
            ideasOutput.appendChild(ideaCard);
        });
    }
});