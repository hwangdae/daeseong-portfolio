---
title: 지도 API 전환과 Polygon 기반 캠퍼스 시각화를 통한 축제 맵 UI/UX 개선
description: 축제 맵 UI/UX 개선
date: '2026-09-07'
problem: |-
  축제 환경 특유의 밀집된 공간 구조로 인해 **주점 위치를 직관적으로 파악하기 어려움**
solution: |-
  **네이버 지도 API로 전환**
  OpenStreetMap 데이터를 활용해 **캠퍼스 Polygon 데이터 직접 추출** 및 가공
result: |-
  지도 API 전환을 통한 **고배율 줌 레벨 지원** 및 주점 간 위치 구분 정확도 개선
  캠퍼스 영역 시각화를 통한 **주점 위치 인지력 향상** 및 사용자 경험 개선
thumbnail: /assets/zoom-level.svg
---
<h1>개요</h1><p>대학교 축제에서 사용하는 <strong>원격 웨이팅 &amp; 테이블 오더 서비스</strong>에서 사용자에게 주점 위치를 보여주고, 원하는 주점을 탐색할 수 있는 <strong>지도 페이지</strong> 구현을 맡았습니다.</p><p>지도 API를 선정하기 전, 다음 세 가지 기준을 세웠습니다.</p><ol><li><p>사용자가 가장 익숙하게 사용할 수 있는 지도일 것</p></li><li><p>개발자가 활용하기 쉽고 문서화가 잘 되어 있을 것</p></li><li><p>밀집된 주점 환경에서도 위치를 쉽게 구분할 수 있을 만큼 지형과 공간 정보를 명확하게 제공할 것</p></li></ol><p>이 기준을 바탕으로 첫 번째 선택은 <strong>카카오 지도 API</strong>였습니다. 국내 사용자에게 익숙한 UI를 제공하고 있었으며, 개발자 문서와 SDK 또한 잘 정리되어 있어 빠르게 개발을 진행할 수 있다고 판단했습니다.</p><p>사용자는 지도에서 원하는 주점의 마커를 선택해 <strong>주점 정보 확인, 북마크, 웨이팅</strong> 등의 기능을 이용하도록 설계했습니다. 하지만 실제 서비스를 테스트하는 과정에서, <strong>주점이 밀집된 축제 환경에서는 원하는 주점을 정확하게 선택하기 어려운 문제</strong>를 발견했습니다. 마커들이 서로 겹쳐 구분되지 않았고, 충분한 확대가 불가능해 사용성이 크게 저하되었습니다. 이는 지도 페이지의 핵심 기능인 <strong>'원하는 주점을 쉽게 찾는 경험'</strong>을 방해하는 문제였고, 지도 API를 다시 검토하게 되었습니다.</p><h1>&nbsp;</h1><h1>문제 1. 주점이 너무 붙어 있어 구분이 어려웠다</h1><p>축제 특성상 주점이나 각종 행사가 운동장이나 중앙광장처럼 좁은 공간에 모여 있습니다.</p><p>지도에는 수십 개의 마커가 표시되는데, 확대가 충분하지 않아 마커가 서로 겹치고 원하는 주점을 선택하기 어려웠습니다.</p><p>특히 카카오 지도는 최대 확대 레벨에도 한계가 있어 원하는 만큼 확대되지 않았습니다.</p><p>결과적으로 <strong>내가 누르려는 주점이 어디인지 잘 모르겠다, 원하는 주점을 찾기 위해 지도를 봤는데 정확히 어디에 위치해 있는지 모르겠다</strong> 라는 UX 문제가 발생했습니다.</p><h1>&nbsp;</h1><h1>원인 분석</h1><p>문제의 원인은 <strong>카카오 지도 API의 최대 확대 수준에 한계가 있다는 점</strong>이었습니다.</p><p>카카오 지도는 <strong>Zoom Level 숫자가 낮을수록 더 크게 확대되며, Level 1이 제공 가능한 최대 확대 수준</strong>입니다. 하지만 축제처럼 여러 주점이 운동장과 같은 좁은 공간에 밀집된 환경에서는 최대 확대(Level 1)에서도 각 주점을 충분히 구분하기 어려웠습니다.</p><p>아래 이미지에서도 확인할 수 있듯이, 최대 확대 상태에서도 마커들이 서로 겹쳐 보였고, 원하는 주점을 정확하게 선택하기 어려운 문제가 발생했습니다.</p><p>이 원인은 마커 개수나 UI 구현 방식이 아니라 <strong>지도 API 자체의 확대 한계</strong>였습니다. 실제 확대 수준을 비교해 보면 <strong>카카오 지도의 최대 확대(Level 1)는 네이버 지도의 약 Zoom 19~20 수준</strong>에 해당하며, <strong>네이버 지도는 Zoom 21까지 추가 확대를 지원</strong>합니다. 두 지도는 타일 구조와 축척(Scale)이 달라 레벨 숫자를 단순 비교할 수는 없지만, 실제 사용 환경에서는 네이버 지도가 더 세밀한 확대를 제공했습니다.</p><h1>&nbsp;</h1><h1>해결 방법</h1><p>여러 지도 API를 비교한 결과, 네이버 지도는 더 높은 확대 레벨을 지원하고 좁은 공간에서도 위치를 훨씬 세밀하게 표현할 수 있었습니다.</p><p>그래서 지도 API 자체를 <strong>네이버 지도 API로 마이그레이션</strong>하기로 결정했습니다.</p><p>기존 구조가 지도 라이브러리에 크게 의존하지 않도록 설계되어 있었기 때문에, 지도 컴포넌트만 교체하는 방식으로 변경을 진행했습니다.</p><h1>&nbsp;</h1><h1>마이그레이션 후 결과</h1><p>동일한 위치를 비교하면 카카오 지도는 최대 확대에서도 마커가 서로 붙어있어서 원하는 주점을 선택하기 어려웠지만,</p><p>네이버 지도는 더 높은 확대가 가능했기 때문에 주점의 위치가 명확하게 구분되어서 터치 오차가 감소했습니다.</p><p></p><img src="https://blog.kakaocdn.net/dna/dFWDLO/dJMcabLKLFR/AAAAAAAAAAAAAAAAAAAAAKAq4kKEokYPBcEIIH5G3oJN-_KSBvnJ4D7-aeo7lUXR/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1790780399&amp;allow_ip=&amp;allow_referer=&amp;signature=La2YBukjCi2qjxxst2wXL%2Fpz0ww%3D" width="674" height="534"><p></p><h1>&nbsp;</h1><h1>&nbsp;</h1><h1>문제 2. 캠퍼스 위치를 직관적으로 표현하기 어려웠다</h1><p>또 하나의 문제는 축제는 캠퍼스 내부에서만 진행되는데, 처음 접속한 사용자는 알기 어려웠습니다.</p><p>대학교 카테고리를 활용하여 대학교의 캠퍼스 위치로 바로 이동이 가능했지만 더 명확하게 캠퍼스의 위치를 보여주면&nbsp;</p><p>단순히 마커만 찍어두는 것은 공간 정보를 전달하기에 부족했습니다.</p><h1>&nbsp;</h1><h1>해결 방법</h1><p>캠퍼스 외곽을 <strong>Polygon</strong>으로 시각화하여 사용자가 축제가 진행되는 영역을 한눈에 파악할 수 있도록 개선했습니다.</p><p>&nbsp;</p><p>하지만 학교 경계를 나타내는 Polygon 데이터는 별도로 제공되지 않았습니다. 이를 해결하기 위해 <strong>OpenStreetMap</strong>에서 학교의 Relation 또는 Way 데이터를 추출한 뒤, <strong>GeoJSON</strong> 형식으로 변환하여 활용했습니다.</p><p>다만, 추출한 GeoJSON 데이터는 지도 라이브러리에서 사용하는 Polygon 좌표 형식과 달랐기 때문에 추가적인 데이터 가공 과정이 필요했습니다.</p><p>&nbsp;</p><p>OpenStreetMap에서 추출한 좌표는 다음과 같이 객체 배열 형태로 제공됩니다.</p><p>&nbsp;</p><pre><code class="language-typescript">[
  {
    "lat": 37.123,
    "lon": 127.123
  },
  {
    "lat": 37.124,
    "lon": 127.124
  }
]</code></pre><p>&nbsp;</p><p>&nbsp;</p><p>하지만 지도 라이브러리에서는 [[lng, lat]] 형태의 Polygon 데이터가 필요했기 때문에 좌표를 변환하는 작업이 필요했습니다.</p><p>&nbsp;</p><pre><code class="language-typescript">[
  [126.9784,37.5653],
  [126.9789,37.5657],
  ...
]</code></pre><p>&nbsp;</p><p>좌표를 <strong>lat, lon 객체 형태에서 [lon, lat] 배열 형태로 변경</strong>하고, 이를 다시 <strong>Multi Polygon 구조</strong>로 감싸는 작업이 필요했습니다.</p><p>반복적인 수작업을 줄이기 위해 간단한 변환 도구를 만들어 원하는 형식으로 변환한 뒤, 클립보드에 바로 복사할 수 있도록 구현했습니다.</p><pre><code class="language-typescript">import { Button } from "@repo/ui";
import { useState } from "react";

const GeoDataForm = () =&gt; {
  const [geoData, setGeoData] = useState("");

  const copyPolygon = () =&gt; {
    const parsed = JSON.parse(geoData);
    const polygon = [
      parsed.map(({ lat, lon }: { lat: number; lon: number }) =&gt; [
        lon,
        lat,
      ]),
    ];

    navigator.clipboard.writeText(JSON.stringify(polygon, null, 2));
    alert("복사가 완료 되었습니다.");
  };

  return (
    &lt;div className="fixed left-1/2 -translate-x-1/2 bottom-20 w-full z-50 px-2.5"&gt;
      &lt;form
        onSubmit={(e) =&gt; {
          e.preventDefault();
          copyPolygon();
        }}
      &gt;
        &lt;textarea
          className="bg-white w-full min-h-48 outline-none"
          placeholder="데이터를 입력해주세요."
          value={geoData}
          onChange={(e) =&gt; setGeoData(e.target.value)}
        /&gt;
        &lt;Button&gt;데이터 변경 및 복사&lt;/Button&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  );
};

export default GeoDataForm;</code></pre><p>&nbsp;</p><p>변환 도구는 OpenStreetMap에서 추출한 JSON 데이터를 입력받아 <strong>lat, lon을 [lon, lat] 순서로 변경</strong>하고, <strong>Multi Polygon 구조로 감싼 뒤 클립보드에 복사</strong>합니다. 이를 통해 여러 학교의 Polygon 데이터를 빠르게 가공하여 서비스에 적용할 수 있었고, 반복적인 수작업을 크게 줄일 수 있었습니다.</p><h1>&nbsp;</h1><h1>폴리곤 적용 결과</h1><hr><p>캠퍼스 외곽을 Polygon으로 표시하여 축제가 진행되는 영역을 한눈에 확인할 수 있도록 개선했습니다.</p><p>단순히 마커만 표시하던 기존 방식보다 공간 정보를 더욱 직관적으로 전달할 수 있었습니다.</p><p></p><img src="https://blog.kakaocdn.net/dna/BzAn0/dJMcadJBTZE/AAAAAAAAAAAAAAAAAAAAAMixvGXUrqE1ozPxgN6KYYFY-GRkW4vXX0aATPZI2L9t/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1790780399&amp;allow_ip=&amp;allow_referer=&amp;signature=umZzAuoUWTVk0owoYVr5Mt6CCYs%3D" width="754" height="598"><p></p><h1>마무리</h1><p>이번 프로젝트는 단순히 기능을 구현하는 것보다 사용자, 성능 개선을 목표로 시작했습니다.</p><p>&nbsp;</p><p>지도 API의 확대 한계를 해결하기 위해 여러 지도 서비스를 직접 비교·검토했고, 문제를 우회하기보다 <strong>라이브러리 수준에서 해결하는 것이 가장 적합하다</strong>고 판단하여 지도 API를 변경했습니다. 또한 사용자가 캠퍼스의 공간 정보를 더 직관적으로 이해할 수 있도록 Polygon을 적용했습니다.</p><p>&nbsp;</p><p>이번 경험을 통해 기능 구현뿐만 아니라 문제의 원인을 분석하고, 사용자 경험을 고려해 최적의 해결책을 선택하는 과정의 중요성을 느낄 수 있었습니다.</p>
